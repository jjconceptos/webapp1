import React from 'react';
import Layout from '/layouts/layout';

const Team = () => {

  const handleConocenosClick = () => {
    // Specify the position you want to scroll to (adjust the value as needed)
    const scrollPosition = 680; // Replace with your desired position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth', // Use smooth scrolling
    });
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

        .team-container {
          width: 80%;
        margin: 0 auto;
        margin-top: 5vh;
        }

        .big-title {
          font-size: 48px;
          text-align: center;
          color: #000;
          margin-bottom: 20px;
          margin-top: 45vh; 
        }

        .side-title {
          font-size: 18px;
          text-align: center;
          color: #000;
          margin-bottom: 10px;
          cursor: pointer;
          z-index: 2;
        }

        .below-title-text {
          font-size: 18px;
         
          text-align: left;
          width: 40%;
          color: #333;
          margin-top: 35vh;
          left: 11vh;
          padding-bottom: 15vh;
        }

        .second-below-title-text {
          font-size: 18px;
          position: absolute;
          text-align: right;
          color: #333;
          margin-top: 0vh;
          right: 5vh;
          width: 40%;
          
        }

        .image-container {
          position: absolute;
          top: 160vh;
          right: 5vh;
          width: 40%;
          height: 75%;
          background-image: url('/cop.jpeg');
          background-size: cover;
          background-position: center;
          
          z-index: 1;
        }

        .second-image-container {
          position: absolute;
          top: 250vh;
          left: 5vh;
          width: 40%;
          height: 75%;
          background-image: url('/jamie.jpg');
          background-size: cover;
          background-position: center;
          margin-bottom: 85vh;
          
          z-index: 1;
        }

        .paragraph-jp-one {
          margin-top: 85vh;
         
        }

        .paragraph-jp-two {
          margin-top: 10vh;
        }

        .paragraph-j-one {
          margin-top: 5vh;
        }

        .paragraph-j-two {
          margin-top: 5vh;
        }

        .paragraph-j-three {
          margin-top: 5vh;
          margin-bottom: 15vh;
        }

        @media only screen and (max-width: 600px) {
          body {
            height: 300vh; /* Increase overall height for more space */
          }
        
          
          .image-container {
            position: absolute;
            top: 110vh;
            right: 5vh;
            width: 40%;
            height: 25%;
            background-image: url('/cop.jpeg');
            background-size: cover;
            background-position: center;
            border-radius: 100%;
            z-index: 1;
          }
  
          .second-image-container {
            position: absolute;
            top: 160vh;
            left: 5vh;
            width: 40%;
            height: 25%;
            background-image: url('/jamie.jpg');
            background-size: cover;
            background-position: center;
            border-radius: 100%;
            margin-bottom: 555px;
            z-index: 1;
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

          .paragraph-jp-one {
            font-size: 9px;
            margin-top: 25vh;
            t
          }
  
          .paragraph-jp-two {
            font-size: 9px;
            margin-top: 10vh;
            display: none;
          }
  
          .paragraph-j-one {
            font-size: 9px;
            margin-top: 5vh;
            margin-bottom: 15vh;
          }
  
          .paragraph-j-two {
            font-size: 9px;
            margin-top: 5vh;
            display: none;
          }
  
          .paragraph-j-three {
            font-size: 9px;
            margin-top: 5vh;
            margin-bottom: 15vh;
            display: none;
          }

          
        }
        
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          /* Add specific styles for this screen size */
        }

        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          /* Add specific styles for this screen size */
        }
      `}</style>

<div className="team-container">
      <div className="big-title">
        Quienes somos?
      </div>

      <div className="side-title" onClick={handleConocenosClick}>
        Conocenos!
      </div>

      <div className="below-title-text">
        <p className="paragraph-jp-one">
          Juan Pablo González Andrade, graduado de la Universidad Anáhuac Norte en la carrera de Arquitectura, ha desarrollado 
          varios proyectos de remodelación e interiorismo, diseño de mobiliario para hoteles y centros comerciales, supervisión 
          de obras de gran y pequena escala y planos ejecutivos para la construcción de viviendas.
        </p>
        <p className="paragraph-jp-two">
          Siempre me intereso el porque y el como se realizaban las edificaciones y construcciones que observaba, 
          desde esos momentos surgió mi pasión por el arte del diseño y la arquitectura, con el paso del tiempo
          esa pasión fue incrementando hasta que se convirtió en una necesidad la cual necesitaba explotar al máximo, 
          por ello tome la decisión de estudiar la carrera de arquitectura, cada proyecto que he realizado y 
          realizo hoy en día lo tomo como si fuera para mi, haciendo de cada proyecto una vivencia especial para el cliente.
        </p>
      </div>

      <div className="image-container"></div>

      <div className="second-below-title-text">
        <p className="paragraph-j-one">
          Jaime Rodriguez Flores, egresado del ITESM como ingeniero en mecatronica, es un gran apasionado del diseno industrial, la historia y el software.   
        </p>
        <p className="paragraph-j-two">
          Desde nino Jaime tuvo un fuerte contacto con el mundo de la construccion y el diseno. Acompanando a su padre a construcciones y crecer en una familia llena de disenadores y creativos
          abrio una curiosidad por este mundo y el buen gusto en el.
          Mas tarde se unio al taller de carpinteria de su padre, ayudandole a coordinar y supervisar proyectos de lujo para clientes en la Ciudad de Mexico y en la playa de Acapulco. 
        </p>
        <p className="paragraph-j-three">
          Jaime toma inspiracion de estilos como la arquitectura Neocolonial Mexicana, el Brutalismo Sovietico, arquitectura Elizabetana y Barroco Frances pero lo mas importante, 
          plasmar la esencia de cada cliente. 
        </p>
      </div>

      <div className="second-image-container"></div>
    </div>
    </Layout>
  );
};

export default Team;
