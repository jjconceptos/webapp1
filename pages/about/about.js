import React, { useState, useEffect, useRef } from 'react';
import Layout from '/layouts/layout';
import Tooltip from '/layouts/tooltip';


const About = () => {

  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const handleTooltip = (sentences, event) => {
    const yOffset = 560;
    const xOffset = 0;
  
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
    const scrollPosition = 700; // Replace with your desired position
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
          <p style={{fontSize:'5vw'}}>Plan A</p>
          <p style={{fontSize:'3vw'}}>Proyecto visual</p>
          <p style={{fontSize:'2vw'}}>- Planta de distribucion</p>
          <p style={{fontSize:'2vw'}}>- Imagenes de referencia</p>
          <p style={{fontSize:'2vw'}}>- Moodboard</p>
          <p style={{fontSize:'2vw'}}>- Renders</p>
          <p style={{fontSize:'2vw'}}>- Seleccion de mobiliario e interiores</p>
        </>
      ),
    },
    {
      title: 'Plan B',
      jsx: (
        <>
          <p style={{fontSize:'5vw'}}>Plan B</p>
          <p style={{fontSize:'3vw'}}>Proyecto mobiliario</p>
          <p
            style={{ fontSize: '2vw' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Todo lo que incluye Plan A', e)}
            onMouseOut={handleTooltipClose}
          >
            - Proyecto visual
          </p>
         
          <p style={{fontSize:'2vw'}}></p>
          <p
            style={{ fontSize: '2vw' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Seleccion de colores y texturas\n- Seleccion de mobiliario\n- Ambientacion\n- Iluminacion', e)}
            onMouseOut={handleTooltipClose}
          >
            - Decoracion de interiores
          </p>
          <p style={{fontSize:'2vw'}}>- Mano de obra</p>
          <p style={{fontSize:'2vw'}}>- Flete</p>
          <p style={{fontSize:'2vw'}}>- Instalacion</p>
          <p
            style={{ fontSize: '2vw' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Supervision a cargo de un arquitecto o ingeniero calificado', e)}
            onMouseOut={handleTooltipClose}
          >
            - Supervision
          </p>
          <p style={{fontSize:'2vw'}}>- Entrega final al cliente</p>
          
        </>
      ),
    },
    {
      title: 'Plan C',
      jsx: (
        <>
          <p style={{fontSize:'5vw'}}>Plan C</p>
          <p style={{fontSize:'3vw'}}>Ejecucion de proyecto</p>
          <p
            style={{ fontSize: '2vw' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Todo lo que incluye Plan A\n- Se descuenta el precio del proyecto visual!', e)}
            onMouseOut={handleTooltipClose}
          >
            - Proyecto visual
          </p>
          <p
            style={{ fontSize: '2vw' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Seleccion de colores y texturas\n- Seleccion de mobiliario\n- Ambientacion\n- Iluminacion', e)}
            onMouseOut={handleTooltipClose}
          >
            - Decoracion de interiores
          </p>
          <p
            style={{ fontSize: '2vw' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Incluye:\n- Diseno de espacios\n- Colocacion pisos\n- Paredes, tapices y pintura', e)}
            onMouseOut={handleTooltipClose}
          >
            - Diseno de interiores
          </p>
          <p style={{fontSize:'2vw'}}>- Mobiliario a la medida</p>
          <p style={{fontSize:'2vw'}}>- Mano de obra</p>
          <p style={{fontSize:'2vw'}}>- Flete</p>
           <p style={{fontSize:'2vw'}}>- Instalacion</p>
          <p
            style={{fontSize:'2vw'}}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('Supervision a cargo de un arquitecto o ingeniero calificado', e)}
            onMouseOut={handleTooltipClose}
          >
            - Supervision
          </p>
          <p style={{fontSize:'2vw'}}>- Entrega final al cliente</p>
          
        </>
      ),
    },
  ];

  
    
  

  
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
      display: flex;
      flex-direction: column;
      padding-top: 10vh;
    
    }
    
    .vision-section {
      position: relative;
      margin-top: 40vh;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
    }
    
    .big-title {
      font-size: 8vw;
      text-align: center;
      color: #000;
      margin-bottom: 2vh;
    }
    
    .sub-title {
      font-size: 4vw;
      text-align: center;
      color: #000;
      cursor: pointer;
      z-index: 2;
    }

    .nosotros-section {
      position: relative;
      margin-top: 40vh; /* Adjusted margin for better responsiveness */
    }  
    
    .main-text {
      font-size: 2vw; /* Adjusted font size */
      text-align: left;
      color: #333;
      margin-top: 2vh; /* Adjusted margin */
      padding: 2vw; /* Adjusted padding */
    }
    
    
    .tooltip-container {
      position: absolute;
      top: 0; /* Adjust as needed */
      left: 0; /* Adjust as needed */
      z-index: 100; /* Ensure the tooltip is above other elements */
    }
   
    
    .services-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
      grid-gap: 2vw; /* Adjusted grid gap */
      margin-top: 2vh; /* Adjusted margin */
      text-align: center;
    }
    
    .services-section {
      margin-top: 10vh; /* Adjusted margin for better responsiveness */
    }

    .service-plan {
      text-align: center;
      padding: 2vw; /* Adjusted padding */
      border: 1px solid #ddd;
      border-radius: 1vw; /* Adjusted border radius */
      width: 100%;
      text-align: left;
    }
        


      `}</style>
      <div className="about-container">
  <div className="vision-section">
    <div className="big-title">
      Nuestra vision
    </div>

    <div className="sub-title" onClick={handleConocenosClick}>
      Conocenos!
    </div>
  </div>

  <div className="nosotros-section">
    <div className="sub-title">
      SOBRE NOSOTROS
    </div>

    <div className="main-text">
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


  <div className="services-section">
    <div className="sub-title">
      <p>
        SERVICIOS
      </p>
    </div>

    <div className="main-text">
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

  <div className="services-part">
    {isTooltipVisible && (
      <Tooltip text={tooltipText} isVisible={isTooltipVisible} top={tooltipPosition.top} left={tooltipPosition.left} />
    )}
  </div>





</div>

    

    </Layout>
  );
};

export default About;
