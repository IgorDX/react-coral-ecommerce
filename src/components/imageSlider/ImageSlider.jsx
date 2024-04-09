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
    const handleTouchStart = (e) => {

        setIsTouching(true);
        setStartTouchX(e.touches[0].clientX);
        setStartTouchY(e.touches[0].clientY);

    };
    
    const handleTouchMove = (e) => {
        if (!isTouching) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
    
        const diffX = currentX - startTouchX;
        const diffY = currentY - startTouchY;
    
        const horizontalSwipeThreshold = 1; 
    
        if (Math.abs(diffY) > Math.abs(diffX)) {
            setIsTouching(false);
            return;
        }
    
        setIsTouching(false);


        if (diffX > horizontalSwipeThreshold) {
            handleSlideLeft();
        } else if (diffX < -horizontalSwipeThreshold) {
            handleSlideRight();
        }
    };
    const handleTouchEnd = (e)=>{
        document.body.classList.remove("is-touching")
    }
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
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
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
