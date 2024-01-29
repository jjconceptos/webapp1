import React, { useState, useEffect, useRef } from 'react';
import Layout from '/layouts/layout';
import Tooltip from '/layouts/tooltip';
import 'layouts/carouselAbout.css';

const About = () => {

  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const handleTooltip = (sentences, event) => {
    const yOffset = 1260;
    const xOffset = 20;
  
    setTooltipText(sentences);
    setTooltipPosition({
      top: event.clientY + yOffset,
      left: event.clientX + xOffset,
    });
    setTooltipVisibility(true);
  };

  const handleTooltipClose = () => {
    setTooltipVisibility(false);
  };

  const handleConocenosClick = () => {
    // Specify the position you want to scroll to (adjust the value as needed)
    const scrollPosition = 750; // Replace with your desired position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth', // Use smooth scrolling
    });
  };
  
  const plans = [
    {
      title: 'Plan A',
      jsx: (
        <>
          <p style={{fontSize:'25px'}}>Plan A</p>
          <p style={{fontSize:'18px'}}>Proyecto visual</p>
          <p style={{fontSize:'13px'}}>- Planta de distribucion</p>
          <p style={{fontSize:'13px'}}>- Imagenes de referencia</p>
          <p style={{fontSize:'13px'}}>- Moodboard</p>
          <p style={{fontSize:'13px'}}>- Renders</p>
          <p style={{fontSize:'13px'}}>- Seleccion de mobiliario e interiores</p>
        </>
      ),
    },
    {
      title: 'Plan B',
      jsx: (
        <>
          <p style={{fontSize:'25px'}}>Plan B</p>
          <p style={{fontSize:'18px'}}>Proyecto mobiliario</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Todo lo que incluye Plan A', e)}
            onMouseOut={handleTooltipClose}
          >
            - Proyecto visual
          </p>
         
          <p style={{fontSize:'13px'}}></p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Seleccion de colores y texturas\n- Seleccion de mobiliario\n- Ambientacion\n- Iluminacion', e)}
            onMouseOut={handleTooltipClose}
          >
            - Decoracion de interiores
          </p>
          <p style={{fontSize:'13px'}}>- Mano de obra</p>
          <p style={{fontSize:'13px'}}>- Flete</p>
          <p style={{fontSize:'13px'}}>- Instalacion</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Supervision a cargo de un arquitecto o ingeniero calificado', e)}
            onMouseOut={handleTooltipClose}
          >
            - Supervision
          </p>
          <p style={{fontSize:'13px'}}>- Entrega final al cliente</p>
          
        </>
      ),
    },
    {
      title: 'Plan C',
      jsx: (
        <>
          <p style={{fontSize:'25px'}}>Plan C</p>
          <p style={{fontSize:'18px'}}>Ejecucion de proyecto</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Todo lo que incluye Plan A\n- Se descuenta el precio del proyecto visual!', e)}
            onMouseOut={handleTooltipClose}
          >
            - Proyecto visual
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Seleccion de colores y texturas\n- Seleccion de mobiliario\n- Ambientacion\n- Iluminacion', e)}
            onMouseOut={handleTooltipClose}
          >
            - Decoracion de interiores
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Diseno de espacios\n- Colocacion pisos\n- Paredes, tapices y pintura', e)}
            onMouseOut={handleTooltipClose}
          >
            - Diseno de interiores
          </p>
          <p style={{fontSize:'13px'}}>- Mobiliario a la medida</p>
          <p style={{fontSize:'13px'}}>- Mano de obra</p>
          <p style={{fontSize:'13px'}}>- Flete</p>
          <p style={{fontSize:'13px'}}>- Instalacion</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Supervision a cargo de un arquitecto o ingeniero calificado', e)}
            onMouseOut={handleTooltipClose}
          >
            - Supervision
          </p>
          <p style={{fontSize:'13px'}}>- Entrega final al cliente</p>
          
        </>
      ),
    },
  ];

  const yourCarouselItems1 = [

    {
      imagePath: '/61.jpeg',
      text: '',
      
    },

    {
      imagePath: '/7a.jpg',
      text: '',
      
    },
 {
      imagePath: '/90.jpeg',
      text: '',
      
    },
    {
      imagePath: '/91.jpeg',
      text: '',
      
    },
    {
      imagePath: '/63.jpeg',
      text: '',
      
    },

    {
      imagePath: '/93.jpeg',
      text: '',
      
    },
    
    {
      imagePath: '/12a.jpg',
      text: '',
      
    },
    {
      imagePath: '/64.jpeg',
      text: '',
      
    },
    {
      imagePath: '/13a.jpg',
      text: '',
      
    },
    {
      imagePath: '/14a.jpg',
      text: '',
      
    },
    
    {
      imagePath: '/16a.jpg',
      text: '',
    
    },
    
    {
      imagePath: '/1a.jpg',
      text: '',
      
    },
    
    {
      imagePath: '/2a.jpg',
      text: '',
      
    },
    {
      imagePath: '/10a.jpg',
      text: '',
      
    },
    
    {
      imagePath: '/15.jpeg',
      text: '',
      
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
      <style jsx>{`
       body {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: auto;
      }
      
      .about-container {
        width: 80%;
        margin: 0 auto;
        margin-top: 5vh;
      }
      
      
      .section {
       
        margin-top: 45vh; /* Adjust margin below the header */
      }

      .about-us-section {
       
        margin-top: 45vh; /* Adjust margin below the header */
      }

      .services-part {
            
        margin-top: 35vh; 
       
      }

      .services-section {
       
        margin-top: 35vh; /* Adjust margin below the header */
      }
      
      
      .big-title {
        font-size: 48px;
        text-align: center;
        color: #000;
        margin-bottom: 20px;
      }
      
      .side-title {
        font-size: 18px;
        text-align: center;
        color: #000;
        margin-bottom: 10px;
        cursor: pointer;
        z-index: 2;
      }
      
      .below-title-undertitle {
        font-size: 18px;
        text-align: center;
        color: #333;
        margin-top: 20px; /* Adjust margin above the text */
      }
      
      .below-title-text {
        font-size: 18px;
        text-align: left;
        color: #333;
        margin-top: 30px; /* Adjust margin above the text */
        padding: 20px;
      }

      .conceptos-text {
        
        text-align: center;
        margin-top: -40vh; /* Adjust margin above the text */
        
      }
      
      .tooltip-container {
        position: absolute;
        top: 0; // Adjust as needed
        left: 0; // Adjust as needed
        z-index: 100; // Ensure the tooltip is above other elements
      }

      .carousel-container {
        margin-top: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .services-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;
        margin-top: 30px; /* Adjusted margin */
        text-align: center;
      }
      
      .service-plan {
        text-align: center;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
        width: 100%;
        text-align: left;
      }
      
      .services-text {
        font-size: 26px;
        margin-top: 20px; /* Adjusted margin */
        text-align: center;
      }
      
      .services-under-text {
        font-size: 12px;
        margin-top: 20px; /* Adjusted margin */
        text-align: center;
      }
      
      
      
      

        @media only screen and (max-width: 600px) {

          body {
            height: 300vh; /* Increase overall height for more space */
          }
        
          
          .section {
          
            margin-top: 20vh; /* Adjust margin below the header */
          }

          .about-us-section {
          
            margin-top: 40vh; /* Adjust margin below the header */
          }

          .services-section {
          
            margin-top: 35vh; /* Adjust margin below the header */
          }
        
          .big-title {
            font-size: 32px;
            margin-bottom: 20px;
          }
        
          .side-title {
            font-size: 16px;
            margin-bottom: 15px;
          }
        
          .below-title-undertitle {
            font-size: 16px;
            margin-top: 30vh;
          }
        
          .below-title-text {
            font-size: 16px;
            margin-top: 5vh;
            padding: 10vh 5vw;
          }

          .services-part {
            
            margin-top: 5vh; 
           
          }
        
          .services-text {
            font-size: 16px;
            margin-top: 1vh; /* Adjusted margin */
            text-align: center;
          }
          
          .services-under-text {
            font-size: 20px;
            position: relative;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 1vh;
            padding-bottom: 10vh;
          }
        
          .services-under-text {
            font-size: 12px;
            margin-top: 7vh;
            padding-bottom: 10vh;
          }
        
          .services-container {
            grid-template-columns: repeat(1, 1fr);
            grid-gap: 20px;
            margin-top: 10vh;
            padding-bottom: 30vh;
          }
        }
        
        
        

        @media only screen and (min-width: 601px) and (max-width: 768px) {
          ul {
            /* Add specific styles for this screen size */
          }
        
          footer {
            /* Add specific styles for this screen size */
          }
        }

        
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  ul {
    /* Add specific styles for this screen size */
  }

  footer {
    /* Add specific styles for this screen size */
  }
}

      `}</style>
      <div className="about-container">
  <div className="section">
    <div className="big-title">
      Nuestra vision
    </div>

    <div className="side-title" onClick={handleConocenosClick}>
      Conocenos!
    </div>
  </div>

  <div className="about-us-section">
    <div className="below-title-undertitle">
      SOBRE NOSOTROS
    </div>

    <div className="below-title-text">
      <p>
        JJ Conceptos, es un taller de remodelación e interiorismo basado en Mexico pero que busca siempre tomar en cuenta una visión internacional.
      </p>
      <p>
        Con especialidad en mobiliario a la medida, JJ Conceptos nace como eso, un taller de muebles. En 2021 el arquitecto Juan Pablo Gonzalez y el
        ingeniero Jaime Rodriguez, se unen con un objetivo: Al paso del tiempo, y después de trabajar con diversos clientes, el equipo se amplía y nuestros servicios también, para ofrecer soluciones de interiorismo integral que definimos con los siguientes tres pilares: Arquitectura, Interiorismo y Branding.
      </p>
      <p>
        Nuestro taller mezcla tradición con innovación, para presentar al cliente un producto estético y práctico.
      </p>
      
    </div>
  </div>


  <div className="services-part">
    <div className="services-text">
      <p>
        SERVICIOS
      </p>
    </div>

    <div className="services-under-text">
      <p>
        Por favor coloca el mouse encima del servicio que quieras conocer más a detalle (no todos tienen detalle)
      </p>
    </div>

    <div className="services-container">
      {plans.map((plan, index) => (
        <div key={index} className="service-plan">
          {plan.jsx}
        </div>
      ))}
    </div>
  </div>

  <div className="section">
    {isTooltipVisible && (
      <Tooltip text={tooltipText} isVisible={isTooltipVisible} top={tooltipPosition.top} left={tooltipPosition.left} />
    )}
  </div>


  <div >
  <div className="conceptos-text">
    <p>Conceptos</p>
  </div>
  <label>
    <Carousel items={yourCarouselItems1} />
  </label>
</div>



</div>

    

    </Layout>
  );
};

export default About;
