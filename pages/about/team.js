import React, { useState, useEffect, useRef } from 'react';
import Layout from '/layouts/layout';


const Team = () => {

  

  

  

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
          left: 11vh;
          width: 40%;
          
        }

        .second-below-title-text {
            font-size: 18px;
            position: absolute;
            text-align: right;
            color: #333; /* Adjust text color as needed */
            margin-top: 190vh; /* Add 30vh margin above the text */
            right: 11vh;
            width: 40%;
            padding-bottom: 15vh;

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

        .image-container {
            position: absolute;
            top: 150vh; /* Adjust the top position as needed */
            right: 5vh; /* Adjust the left position as needed */
            width: 30%; /* Adjust the width of the image container */
            height: 30%; /* Adjust the height of the image container */
            background-image: url('/lake.jpg'); /* Provide the path to your image */
            background-size: cover; /* Adjust as needed */
            background-position: center; /* Adjust as needed */
            z-index: 1; /* Ensure the image is behind the text */
          }
        
          .second-image-container {
            position: absolute;
            top: 250vh; /* Adjust the top position as needed */
            left: 5vh; /* Adjust the right position as needed */
            width: 30%; /* Adjust the width of the image container */
            height: 30%; /* Adjust the height of the image container */
            background-image: url('/lake.jpg'); /* Provide the path to your second image */
            background-size: cover; /* Adjust as needed */
            background-position: center; /* Adjust as needed */
            z-index: 1; /* Ensure the image is behind the text */
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
      
      
      <div className="below-title-text">
      <p style={{marginTop: '200px'}}>
       TEXTO COCO es el resultado de la experiencia del arquitecto Juan Pablo Gonzalez. 
      </p>
      <p style={{marginTop: '30px'}}>
      El estudio ofrece soluciones innovadoras, funcionales y atractivas de estética refinada basadas en conceptos bien definidos que se reflejan en productos y experiencias memorables.
      A través de una metodología de trabajo de 360º que incorpora tres pilares esenciales: Arquitectura, Diseño Industrial y Branding.
      </p>
      <p style={{marginTop: '30px'}}>
      GONZÁLEZ concibe una narrativa específica para cada cliente, permitiéndoles contar su propia historia.
      Con una experiencia destacada en los campos de hospitalidad, venta al por menor, alimentos y bebidas, así como en exposiciones e instituciones culturales, los proyectos de GONZÁLEZ se definen por la convergencia entre tradición y vanguardia, combinando calidad, practicidad y sofisticación.
      </p>
     
      </div>

      <div className="image-container"></div>

      <div className="second-below-title-text">
      <p style={{marginTop: '1800px'}}>
      TEXTO JAMES, es el resultado de la experiencia del arquitecto Juan Pablo Gonzalez. 
      </p>
      <p style={{marginTop: '30px'}}>
      El estudio ofrece soluciones innovadoras, funcionales y atractivas de estética refinada basadas en conceptos bien definidos que se reflejan en productos y experiencias memorables.
      A través de una metodología de trabajo de 360º que incorpora tres pilares esenciales: Arquitectura, Diseño Industrial y Branding.
      </p>
      <p style={{marginTop: '30px'}}>
      GONZÁLEZ concibe una narrativa específica para cada cliente, permitiéndoles contar su propia historia.
      Con una experiencia destacada en los campos de hospitalidad, venta al por menor, alimentos y bebidas, así como en exposiciones e instituciones culturales, los proyectos de GONZÁLEZ se definen por la convergencia entre tradición y vanguardia, combinando calidad, practicidad y sofisticación.
      </p>
     
      </div>

      <div className="second-image-container"></div>

      <div>
      
 
      </div>


    

    </Layout>
  );
};

export default Team;
