// Carousel.js
import React from 'react';
import './carousel.css'; // Import the CSS for styling

const Carousel = ({ images }) => {
  return (
    <div className="carousel">
      <div className="carousel-content">
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Carousel Image ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button prev">Prev</button>
      <button className="carousel-button next">Next</button>
    </div>
  );
};

export default Carousel;
