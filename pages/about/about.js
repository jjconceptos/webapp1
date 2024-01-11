import React, { useState, useEffect, useRef } from 'react';
import Layout from '/layouts/layout';
import 'layouts/carouselAbout.css';

const About = () => {

 

  const yourCarouselItems1 = [
    
    {
      imagePath: '/1a.jpg',
      text: 'kaki',
      
    },
    {
      imagePath: '/2a.jpg',
      text: 'kaki',
      
    },
    {
      imagePath: '/7a.jpg',
      text: 'kaki',
      
    },
    {
      imagePath: '/4.jpeg',
      text: '',
    
    },
    {
      imagePath: '/5.jpeg',
      text: '',
      
    },
    {
      imagePath: '/6.jpeg',
      text: '',
      
    },
    {
      imagePath: '/7.jpeg',
      text: '',
      
    },
    {
      imagePath: '/8.jpeg',
      text: 'Clasico',
      
    },
  ];

  const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
    };
  
    return (
      <div className="carousel">
        <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.imagePath} alt={`Image ${index + 1}`} />
              <div className="carousel-footer">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={handlePrev} className="carousel-button prev">
          &lt;
        </button>
        <button type="button" onClick={handleNext} className="carousel-button next">
          &gt;
        </button>
      </div>
    );
  };

  return (
    <Layout>
      <style jsx global>{`
        body {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100vh;
        }

        .big-title {
          font-size: 48px;
          text-align: center;
          color: #000; /* Adjust text color as needed */
          margin-bottom: 20px; /* Add some space below the big title */
        }

        .side-title {
          font-size: 18px;
          text-align: center;
          color: #666; /* Adjust text color as needed */
          margin-bottom: 10px; /* Add some space below the side title */
        }
        .below-title-undertitle {
          font-size: 18px;
          position: absolute;
          text-align: center;
          color: #333; /* Adjust text color as needed */
          margin-top: 130vh; /* Add 30vh margin above the text */
        }
        .below-title-text {
          font-size: 18px;
          position: absolute;
          text-align: left;
          color: #333; /* Adjust text color as needed */
          margin-top: 190vh; /* Add 30vh margin above the text */
          padding: 40vh;
        }

        .services-text {
          font-size: 26px;
          position: absolute;
          top: 289vh;
          width: 50%;
          overflow: hidden;
          left: 82.2vh;
          padding-bottom: 10vh;
        }

        .services-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 320px;
          position: absolute;
          top: 298vh;
          width: 50%;
          left: 28.7vh;
          padding-bottom: 10vh;
        }

        .service-plan {
          text-align: center;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
        }

      `}</style>
      <div>
      <div className="big-title">
        Welcome to Our About Page
      </div>

      <div className="side-title">
        Descubre nuestra historia!
      </div>
        </div>
      <div className="below-title-undertitle">
      SOBRE NOSOTROS
      </div>
      
      <div className="below-title-text">
      <p style={{marginTop: '200px'}}>
      GONZÁLEZ, una firma multidisciplinaria Mexicana con una visión global, es el resultado de la experiencia del arquitecto Juan Pablo Gonzalez. 
      </p>
      <p style={{marginTop: '30px'}}>
      El estudio ofrece soluciones innovadoras, funcionales y atractivas de estética refinada basadas en conceptos bien definidos que se reflejan en productos y experiencias memorables.
      A través de una metodología de trabajo de 360º que incorpora tres pilares esenciales: Arquitectura, Diseño Industrial y Branding.
      </p>
      <p style={{marginTop: '30px'}}>
      GONZÁLEZ concibe una narrativa específica para cada cliente, permitiéndoles contar su propia historia.
      Con una experiencia destacada en los campos de hospitalidad, venta al por menor, alimentos y bebidas, así como en exposiciones e instituciones culturales, los proyectos de GONZÁLEZ se definen por la convergencia entre tradición y vanguardia, combinando calidad, practicidad y sofisticación.
      </p>
      <p style={{marginTop: '120px', textAlign: 'center'}}>Galeria</p>
      </div>
      <div>
      <label>    
      <Carousel items={yourCarouselItems1} />
    </label>
    </div>
<div className="services-text">
<p>
  Servicios
</p>
</div>

<div className="services-container">
        <div className="service-plan">
          <p>Plan A</p>
          <p>Text for Plan A</p>
        </div>

        <div className="service-plan">
          <p>Plan B</p>
          <p>Text for Plan B</p>
        </div>

        <div className="service-plan">
          <p>Plan C</p>
          <p>Text for Plan C</p>
        </div>
      </div>
    

    

    </Layout>
  );
};

export default About;
