import React, { useEffect, useState, useRef } from 'react';
import "./imageSlider.scss";

const MAX_IMAGE_WIDTH = 600;

export const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(MAX_IMAGE_WIDTH);
  const [startX, setStartX] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [isSmallSliderDown, setIsSmallSliderDown] = useState(false);

  const sliderContainerRef = useRef(null);
  const sliderLineRef = useRef(null);
  const smallSliderRef = useRef(null);

  // Рефы для актуальных обработчиков тача
  const onTouchStartRef = useRef();
  const onTouchMoveRef = useRef();
  const onTouchEndRef = useRef();

  // Инициализация ширины слайдера
  const init = () => {
    if (sliderContainerRef.current) {
      setCurrentIndex(0);
      setWidth(sliderContainerRef.current.offsetWidth);
    }
  };

  // Обработчики для маленького слайдера
  const smallSliderUp = (e) => {
    e.preventDefault();
    setIsSmallSliderDown(false);
  };

  const smallSliderDown = (e) => {
    e.preventDefault();
    setIsSmallSliderDown(true);
    setStartX(e.pageX);
  };

  const smallSliderMove = (e) => {
    e.preventDefault();
    if (!isSmallSliderDown) return;

    if (
      e.pageX - startX > 0 ||
      slides.length * 88 + 20 <= smallSliderRef.current.offsetWidth + Math.abs(e.pageX - startX)
    )
      return;

    smallSliderRef.current.style.transform = `translateX(${e.pageX - startX}px)`;
  };

  // Обработчики мыши
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDown(true);
    if (sliderContainerRef.current) {
      sliderContainerRef.current.classList.add('active');
      setStartX(e.pageX);
      sliderLineRef.current.style.transition = "none";
    }
  };

  const handleMouseUp = (e) => {
    if (!isDown) return;
    setIsDown(false);
    let clientX = e.pageX;
    const diff = clientX - startX;
    const slidesToScroll = 1;
    if (Math.abs(diff) >= width * 0.1) {
      if (diff < 0) {
        setCurrentIndex(Math.min(currentIndex + slidesToScroll, slides.length - 1));
      } else {
        setCurrentIndex(Math.max(currentIndex - slidesToScroll, 0));
      }
    } else {
      sliderLineRef.current.style.transition = "transform 0.3s ease-in-out";
      sliderLineRef.current.style.transform = `translateX(-${currentIndex * width}px)`;
    }
    if (sliderContainerRef.current) {
      sliderContainerRef.current.classList.remove('active');
    }
  };

  const handleSlideLeft = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleSlideRight = () => {
    setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handleMouseMove = (e) => {
    if (isDown) {
      let newPosition = currentIndex * width - (e.pageX - startX);
      const maxScroll = (slides.length - 1) * width;
      newPosition = Math.max(0, Math.min(newPosition, maxScroll));
      sliderLineRef.current.style.transition = "none";
      sliderLineRef.current.style.transform = `translateX(-${newPosition}px)`;
    }
  };

  // Эффект для анимации сдвига слайдера при смене индекса
  useEffect(() => {
    if (sliderLineRef.current) {
      sliderLineRef.current.style.transition = "transform 0.3s ease-in-out";
      sliderLineRef.current.style.transform = `translateX(-${currentIndex * width}px)`;
    }
  }, [currentIndex, width]);

  // Инициализация и ресайз
  useEffect(() => {
    setTimeout(() => {
      init();
    }, 100);

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
    };
  }, []);

  // Локальные переменные для тача (замена isTouching, startTouchX, startTouchY, чтобы они не терялись)
  const isTouchingRef = useRef(false);
  const startTouchXRef = useRef(0);
  const startTouchYRef = useRef(0);

  const TOUCH_ANGLE_THRESHOLD = 45; // угол для фильтрации вертикального скролла

  // Обработчики тача — обязательно обновляем в onTouchXRef.current, чтобы избежать замыканий
  const onTouchStart = (e) => {
    isTouchingRef.current = true;
    startTouchXRef.current = e.touches[0].clientX;
    startTouchYRef.current = e.touches[0].clientY;
  };

  const onTouchMove = (e) => {
    if (!isTouchingRef.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startTouchXRef.current;
    const diffY = currentY - startTouchYRef.current;

    if (Math.sqrt(diffX * diffX + diffY * diffY) < 5) return;

    const touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;

    if (touchAngle > TOUCH_ANGLE_THRESHOLD) {
      isTouchingRef.current = false;
      return;
    }

    e.preventDefault(); 
    console.log("blocking")
    let newPosition = currentIndex * width - (currentX - startTouchXRef.current);
    const maxScroll = (slides.length - 1) * width;
    newPosition = Math.max(0, Math.min(newPosition, maxScroll));
    sliderLineRef.current.style.transition = "none";
    sliderLineRef.current.style.transform = `translateX(-${newPosition}px)`;
  };

  const onTouchEnd = (e) => {
    if (!isTouchingRef.current) return;
    isTouchingRef.current = false;
    const diffX = e.changedTouches[0].clientX - startTouchXRef.current;
    const slidesToScroll = 1;
    if (Math.abs(diffX) >= width * 0.1) {
      if (diffX < 0) {
        setCurrentIndex(Math.min(currentIndex + slidesToScroll, slides.length - 1));
      } else {
        setCurrentIndex(Math.max(currentIndex - slidesToScroll, 0));
      }
    } else {
      sliderLineRef.current.style.transition = "transform 0.3s ease-in-out";
      sliderLineRef.current.style.transform = `translateX(-${currentIndex * width}px)`;
    }
  };

  // Обновляем рефы с обработчиками, чтобы слушатели всегда вызывали актуальные функции
  useEffect(() => {
    onTouchStartRef.current = onTouchStart;
    onTouchMoveRef.current = onTouchMove;
    onTouchEndRef.current = onTouchEnd;
  }, [currentIndex, width, slides.length]);

  // Навешиваем слушатели тач событий один раз с опцией passive
  useEffect(() => {
    const slider = sliderContainerRef.current;
    if (!slider) return;

    const handleTouchStart = (e) => onTouchStartRef.current(e);
    const handleTouchMove = (e) => onTouchMoveRef.current(e);
    const handleTouchEnd = (e) => onTouchEndRef.current(e);

    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="slider">
      <div
        className='small-slider'
        onMouseDown={smallSliderDown}
        onMouseUp={smallSliderUp}
        onMouseMove={smallSliderMove}
      >
        <div className="small-slider-line" ref={smallSliderRef}>
          {slides.map((el, index) => (
            <div key={index} className='slider-item' onClick={() => setCurrentIndex(index)}>
              <img src={el} alt="image" />
            </div>
          ))}
        </div>
      </div>

      <div
        className='slider-container'
        ref={sliderContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // Убраны onTouch* из JSX, слушатели добавлены через addEventListener с пассивными опциями
      >
        <div className='slider-line' ref={sliderLineRef}>
          {slides.map((el, slideIndex) => (
            <div key={slideIndex} className='slide-item'>
              <img className='slider-image' src={el} alt="Product" />
            </div>
          ))}
        </div>

        <button className='arrowHolder left-arrow' onClick={handleSlideLeft}>
          <img src="images/leftArrow.svg" alt="Left arrow" />
        </button>

        <button className='arrowHolder right-arrow' onClick={handleSlideRight}>
          <img src="images/rightArrow.svg" alt="Right arrow" />
        </button>
      </div>
    </div>
  );
};
