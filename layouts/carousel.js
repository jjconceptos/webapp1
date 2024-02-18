

import React, { useState } from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
  

  return (
    <div className="carousel">
      <style jsx>{`

        .carousel {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            max-width: 300px; /* Limiting the width for smaller screens */
            overflow: hidden;
          }
          
          .carousel-content {
            display: flex;
            transition: transform 0.5s ease-in-out;
          }
          
          .carousel-item {
            flex: 0 0 100%; /* Ensure each item occupies the full width of the carousel */
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            max-width: 100%; /* Limit the maximum width of each item */
          }
          
          .carousel-item img {
            width: 100%; /* Ensure the image fills the entire width of its parent container */
            height: auto; /* Allow the height to adjust according to the width */
            object-fit: cover; /* Ensure the image covers the entire container without stretching */
          }
          
          
          .carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            font-size: 16px; /* Decreasing font size for smaller screens */
            background-color: #34495e;
            color: #eaecee;
            border: none;
            border-radius: 5px;
            padding: 5px; /* Decreasing padding for smaller screens */
          }
          
          .prev {
            left: 5px; /* Adjusting button position for smaller screens */
          }
          
          .next {
            right: 5px; /* Adjusting button position for smaller screens */
          }

      `}</style>
      <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Carousel Image ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button prev" onClick={prevSlide}>{"<"}</button>
      <button className="carousel-button next" onClick={nextSlide}>{">"}</button>
    </div>
  );
};

export default Carousel;
