import React, { useState, useEffect, useRef } from 'react';
import Layout from '/layouts/layout';
import Tooltip from '/layouts/tooltip';
import 'layouts/carouselAbout.css';

const About = () => {

  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltipVisible, setTooltipVisibility] = useState(false);

  const handleTooltip = (text, event) => {
    const yOffset = 1800; // Declare yOffset here
    const xOffset = 110; // Declare xOffset here

    setTooltipText(text);

    setTooltipPosition({
      top: event.clientY + yOffset,
      left: event.clientX + xOffset,
    });

    setTooltipVisibility(true);
  };

  const handleTooltipClose = () => {
    setTooltipVisibility(false);
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
          <p style={{fontSize:'13px'}}>- Planos ambientados y/o renders</p>
          <p style={{fontSize:'13px'}}>- Seleccion de mobiliario e interiores</p>
          <p style={{fontSize:'13px'}}>- Presentacion con plantas ambientadas</p>
          <p style={{fontSize:'13px'}}>- Precio</p>
        </>
      ),
    },
    {
      title: 'Plan B',
      jsx: (
        <>
          <p style={{fontSize:'25px'}}>Plan B</p>
          <p style={{fontSize:'18px'}}>Proyecto mobiliario</p>
          <p style={{fontSize:'13px'}}>- Presentacion completa</p>
          <p style={{fontSize:'13px'}}>- Visita al espacio</p>
          <p style={{fontSize:'13px'}}></p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('lo que incluye la propuesta de mobili', e)}
            onMouseOut={handleTooltipClose}
          >
            - Propuesta de mobiliario
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('lo que incluye mano de obra', e)}
            onMouseOut={handleTooltipClose}
          >
            - Mano de obra
          </p>
          <p style={{fontSize:'13px'}}>- Flete</p>
          <p style={{fontSize:'13px'}}>- Instalacion</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('- manejada por un arquitecto o ingeniero calificado', e)}
            onMouseOut={handleTooltipClose}
          >
            - Supervision
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('lo que incluye la entrega final', e)}
            onMouseOut={handleTooltipClose}
          >
            - Entrega final al cliente
          </p>
          
        </>
      ),
    },
    {
      title: 'Plan C',
      jsx: (
        <>
          <p style={{fontSize:'25px'}}>Plan C</p>
          <p style={{fontSize:'18px'}}>Ejecucion de proyecto</p>
          <p style={{fontSize:'13px'}}>- Presentacion completa</p>
          <p style={{fontSize:'13px'}}>- Visita al espacio</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('lo que incluye la propuesta de mobili', e)}
            onMouseOut={handleTooltipClose}
          >
            - Propuesta de mobiliario
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('-', e)}
            onMouseOut={handleTooltipClose}
          >
            - Propuesta de decoracion
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('lo que incluye mano de obra', e)}
            onMouseOut={handleTooltipClose}
          >
            - Mano de obra
          </p>
          <p style={{fontSize:'13px'}}>- Flete</p>
          <p style={{fontSize:'13px'}}>- Instalacion</p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('- manejada por un arquitecto o ingeniero calificado', e)}
            onMouseOut={handleTooltipClose}
          >
            - Supervision
          </p>
          <p
            style={{ fontSize: '13px' }}
            className="tooltip"
            onMouseOver={(e) => handleTooltip('lo que incluye la entrega final', e)}
            onMouseOut={handleTooltipClose}
          >
            - Entrega final al cliente
          </p>
          
        </>
      ),
    },
  ];

  

  

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
          cursor: pointer;
           z-index: 2;
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
          padding-left: 8vh;
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
          grid-gap: 240px; /* Adjust the gap as needed */
          position: absolute;
          top: 298vh;
          width: 90%; /* Adjust the width as needed */
          left: 5%; /* Adjust the left position as needed */
          padding-bottom: 20vh;
        }

        .service-plan {
          text-align: center;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          width: 100%; /* Adjust the width as needed */
          text-align: left;
        }

      `}</style>
      <div>
      <div className="big-title">
        Quienes somos?
      </div>

      <div className="side-title" >
        Conocenos!
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
      <p style={{marginTop: '120px', textAlign: 'left'}}>Vibe</p>
      </div>
      <div>
      
    </div>
<div className="services-text">
<p>
  Servicios
</p>
</div>

<div className="services-container">
        {plans.map((plan, index) => (
          <div key={index} className="service-plan">
            {plan.jsx}
          </div>
        ))}
      </div>

      <div>
        {isTooltipVisible && (
          <Tooltip text={tooltipText} isVisible={isTooltipVisible} top={tooltipPosition.top} left={tooltipPosition.left} />
          
        )}
      </div>
    

    </Layout>
  );
};

export default About;
