import React, { useEffect, useState, useRef } from 'react';
import "./imageSlider.scss";

const MAX_IMAGE_WIDTH = 600;

export const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [width, setWidth] = useState(MAX_IMAGE_WIDTH);
    const [startTouchX, setStartTouchX] = useState(0);
    const [startTouchY, setStartTouchY] = useState(0);
    const [isTouching, setIsTouching] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isDown, setIsDown] = useState(false)
    const sliderContainerRef = useRef(null);

    const init = () => {
        const sliderWidth = document.documentElement.clientWidth;
        setWidth(sliderWidth);
    };


    const sliderLineStyle = ()=>({
        width:  width < MAX_IMAGE_WIDTH ? width : MAX_IMAGE_WIDTH + 'px',
        transform: `translateX(${-(currentIndex * (width < MAX_IMAGE_WIDTH ? width : MAX_IMAGE_WIDTH))}px)`
    })
    const imagesStyle = () => ({
        width: width < MAX_IMAGE_WIDTH ? width + 'px' : MAX_IMAGE_WIDTH + 'px',
        height: 'auto'
    });

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDown(true);
        if (sliderContainerRef.current) {
            sliderContainerRef.current.classList.add('active');
            setStartX(e.pageX - sliderContainerRef.current.offsetLeft);
        }
    };

    const handleMouseLeave = (e) => {
        e.preventDefault();
        setIsDown(false);
        if (sliderContainerRef.current) {
            sliderContainerRef.current.classList.remove('active');
        }
    };

    const handleMouseUp = (e) => {
        e.preventDefault();
        setIsDown(false);
        if (sliderContainerRef.current) {
            sliderContainerRef.current.classList.remove('active');
        }
    };
    const handleSlideLeft = () => {
        setCurrentIndex(prevIndex => prevIndex === 0 ? slides.length - 1 : prevIndex - 1);
    };
    
    const handleSlideRight = ()=>{
        setCurrentIndex(prevIndex => prevIndex === slides.length - 1 ? 0 : prevIndex + 1)
    }
    const handleMouseMove = (e) => {
        if (!isDown) return;
        const x = e.pageX - sliderContainerRef.current.offsetLeft;
        const walk = x - startX;
        const direction = walk > 0 ? 1 : -1;
        setIsDown(false);
        if (direction === -1) {
            handleSlideRight();
        } else if (direction === 1) {
            handleSlideLeft();

        }
    };
    useEffect(() => {
        setCurrentIndex(0); 
    }, [slides]);

    useEffect(() => {

        init();
        window.addEventListener('resize', init);
        return () => {
            window.removeEventListener('resize', init);
        };
    }, []);

  const TOUCH_ANGLE_THRESHOLD = 45; // угол для фильтрации вертикального скролла

  // Переноси логику handleTouchMove сюда (без onTouchMove в JSX)

  useEffect(() => {
    const slider = sliderContainerRef.current;
    if (!slider) return;

    let isTouching = false;
    let startTouchX = 0;
    let startTouchY = 0;

    const onTouchStart = (e) => {
      isTouching = true;
      startTouchX = e.touches[0].clientX;
      startTouchY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isTouching) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = currentX - startTouchX;
      const diffY = currentY - startTouchY;

      if (Math.sqrt(diffX * diffX + diffY * diffY) < 5) return;

      const touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;

      if (touchAngle > TOUCH_ANGLE_THRESHOLD) {
        isTouching = false; // вертикальный скролл — отменяем свайп
        return;
      }

      e.preventDefault(); // блокируем скролл страницы

      isTouching = false;

      const horizontalSwipeThreshold = 1;

      if (diffX > horizontalSwipeThreshold) {
        handleSlideLeft();
      } else if (diffX < -horizontalSwipeThreshold) {
        handleSlideRight();
      }
    };

    const onTouchEnd = () => {
      isTouching = false;
    };

    slider.addEventListener('touchstart', onTouchStart, { passive: true });
    slider.addEventListener('touchmove', onTouchMove, { passive: false });
    slider.addEventListener('touchend', onTouchEnd, { passive: true });
    slider.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      slider.removeEventListener('touchstart', onTouchStart);
      slider.removeEventListener('touchmove', onTouchMove);
      slider.removeEventListener('touchend', onTouchEnd);
      slider.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

    return (
        <div className="slider">
            <div className='small-slider'>  
                {slides.map((el, index) => (
                    <div key={index} className='slider-item' onClick={() => setCurrentIndex(index)}>
                        <img src={el} alt="image" />
                    </div>  
                ))}
            </div>
            <div
    className='slider-container'
    ref={sliderContainerRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseLeave}
>
                <div className='slider-line' style={sliderLineStyle()}>
                    {slides.map((el, slideIndex) => (
                        <div key={slideIndex} className='slide-item'>
                            <img className='slider-image' style={imagesStyle()} src={el} alt="Product" />
                            <button className='arrowHolder left-arrow' onClick={handleSlideLeft}><img src="images/leftArrow.svg" alt="Left arrow" /></button>
                            <button className='arrowHolder right-arrow' onClick={handleSlideRight}><img src="images/rightArrow.svg" alt="Right arrow" /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
