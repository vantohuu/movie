import React, { useRef } from 'react';
import './Slider.css';

const Slider = ({ children }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth;
  };

  const scrollRight = () => {
    sliderRef.current.scrollLeft += sliderRef.current.offsetWidth;
  };

  return (
    <div className="slider-container">
      <button className="slider-button left" onClick={scrollLeft}>
        &lt;
      </button>
      <div className="slider" ref={sliderRef}>
        {children}
      </div>
      <button className="slider-button right" onClick={scrollRight}>
        &gt;
      </button>
    </div>
  );
};

export default Slider;
