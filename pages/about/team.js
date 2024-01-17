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
            top: 130vh; /* Adjust the top position as needed */
            right: 5vh; /* Adjust the left position as needed */
            width: 30%; /* Adjust the width of the image container */
            height: 55%; /* Adjust the height of the image container */
            background-image: url('/cop.jpeg'); /* Provide the path to your image */
            background-size: cover; /* Adjust as needed */
            background-position: center; /* Adjust as needed */
            z-index: 1; /* Ensure the image is behind the text */
          }
        
          .second-image-container {
            position: absolute;
            top: 240vh; /* Adjust the top position as needed */
            left: 5vh; /* Adjust the right position as needed */
            width: 30%; /* Adjust the width of the image container */
            height: 50%; /* Adjust the height of the image container */
            background-image: url('/jamie.jpg'); /* Provide the path to your second image */
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
      Juan Pablo González Andrade, graduado de la Universidad Anáhuac Norte en la carrera de Arquitectura, ha desarrollado 
      varios proyectos de remodelación e interiorismo, diseño de mobiliario para hoteles y centros comerciales, supervisión 
      de obras de gran y pequena escala y planos ejecutivos para la construcción de viviendas:
      </p>
      <p style={{marginTop: '30px'}}>
      Siempre me intereso el porque y el como se realizaban las edificaciones y construcciones que observaba, 
      desde esos momentos surgió mi pasión por el arte del diseño y la arquitectura, con el paso del tiempo
      esa pasión fue incrementando hasta que se convirtió en una necesidad la cual necesitaba explotar al máximo, 
      por ello tome la decisión de estudiar la carrera de arquitectura, cada proyecto que he realizado y 
      realizo hoy en día lo tomo como si fuera para mi, haciendo de cada proyecto una vivencia especial para el cliente.
      </p>
      <p style={{marginTop: '30px'}}>
          
      </p>
     
      </div>

      <div className="image-container"></div>

      <div className="second-below-title-text">
      <p style={{marginTop: '1800px'}}>
      Jaime Rodriguez Flores, egresado del ITESM como ingeniero en mecatronica, es un gran apasionado del diseno industrial, la historia y el software.   
      </p>
      <p style={{marginTop: '30px'}}>
      Desde nino Jaime tuvo un fuerte contacto con el mundo de la construccion y el diseno. Acompanando a su padre a construcciones y crecer en una familia llena de disenadores y creativos
      abrio una curiosidad por este mundo y el buen gusto en el.
      Mas tarde se unio al taller de carpinteria de su padre, ayudandole a coordinar y supervisar proyectos de lujo para clientes en la Ciudad de Mexico y en la playa de Acapulco. 
      
      </p>
      <p style={{marginTop: '30px'}}>
      Jaime toma inspiracion de estilos como la arquitectura Neocolonial Mexicana, el Brutalismo Sovietico, arquitectura Elizabetana y Barroco Frances pero lo mas importante, 
      plasmar la esencia de cada cliente. 
      </p>
     
      </div>

      <div className="second-image-container"></div>

      <div>
      
 
      </div>


    

    </Layout>
  );
};

export default Team;
