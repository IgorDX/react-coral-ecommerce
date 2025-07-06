import React, { useEffect, useState, useRef } from 'react';
import "./imageSlider.scss";

const MAX_IMAGE_WIDTH = 600;

export const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [width, setWidth] = useState(MAX_IMAGE_WIDTH);
    const [isTouching, setIsTouching] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isDown, setIsDown] = useState(false)
    const [isSmallSliderDown, setIsSmallSliderDown] = useState(false)
    const sliderContainerRef = useRef(null);
    const sliderLineRef = useRef(null);
    const smallSliderRef = useRef(null);

    const init = () => {
  if (sliderContainerRef.current) {
    setCurrentIndex(0)
    setWidth(sliderContainerRef.current.offsetWidth);
  }
    };
    const smallSliderUp= (e)=>{
                e.preventDefault()
        setIsSmallSliderDown(false);
    }
    const smallSliderDown= (e)=>{
        e.preventDefault()
        setIsSmallSliderDown(true);
        setStartX(e.pageX)
    }
    const smallSliderMove = (e)=>{
        e.preventDefault()
        if(!isSmallSliderDown)
            return; // 
        if(e.pageX - startX > 0 || slides.length * 88 + 20 <= smallSliderRef.current.offsetWidth + Math.abs(e.pageX - startX))
            return
        smallSliderRef.current.style.transform = `translateX(${e.pageX - startX}px)`; 
    }
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
        const slidesToScroll = 1
        if (Math.abs(diff) >= width * 0.1) {
            if (diff < 0) {
                setCurrentIndex(Math.min(currentIndex + slidesToScroll, slides.length - 1));
            } else {
                setCurrentIndex(Math.max(currentIndex - slidesToScroll, 0));
            }
        }

         sliderLineRef.current.style.transition = "transform 0.3s ease-in-out";
         sliderLineRef.current.style.transform = `translateX(-${currentIndex * width}px)`;

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
        if(isDown){
        let newPosition = (currentIndex * width) - (e.pageX - startX);
        const maxScroll = (slides.length - 1) * width;
        newPosition = Math.max(0, Math.min(newPosition, maxScroll));
        sliderLineRef.current.style.transition = "none";
        sliderLineRef.current.style.transform = `translateX(-${newPosition}px)`; 
        }
    };


    useEffect(() => {
          if (sliderLineRef.current) {
            sliderLineRef.current.style.transform = `translateX(-${currentIndex*width}px)`; 
        }
    }, [currentIndex]);

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
        isTouching = false; 
        return;
      }

      e.preventDefault(); // блокируем скролл страницы

      isTouching = false;

        const slidesToScroll = 1
        if (Math.abs(diffX) >= width * 0.1) {
            if (diffX < 0) {
                setCurrentIndex(Math.min(currentIndex + slidesToScroll, slides.length - 1));
            } else {
                setCurrentIndex(Math.max(currentIndex - slidesToScroll, 0));
            }
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
            <div className='small-slider' 
                                      onMouseDown={smallSliderDown}
            onMouseUp={smallSliderUp}
            onMouseMove={smallSliderMove}
            >  
              <div className="small-slider-line" ref={smallSliderRef}
              >
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
>
                <div className='slider-line' ref={sliderLineRef}>
                    {slides.map((el, slideIndex) => (
                        <div key={slideIndex} className='slide-item'>
                            <img className='slider-image' src={el} alt="Product" />
                        </div>
                    ))}
                    
                </div>
                 <button className='arrowHolder left-arrow' onClick={handleSlideLeft}><img src="images/leftArrow.svg" alt="Left arrow" /></button>
                     <button className='arrowHolder right-arrow' onClick={handleSlideRight}><img src="images/rightArrow.svg" alt="Right arrow" /></button>
            </div>
        </div>
    );
};
