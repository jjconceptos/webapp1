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
            top: 148vh;
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
          
        .team-container {
            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            padding-top: 10vh;
        }

        .quienes-section {
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
        

          .jp-text {
            font-size: 18px;
           
            text-align: left;
            width: 40%;
            color: #333;
            margin-top: 35vh;
            left: 11vh;
            padding-bottom: 15vh;
          }
  
          .j-text {
            font-size: 18px;
            position: absolute;
            text-align: right;
            color: #333;
            margin-top: 0vh;
            right: 5vh;
            width: 40%;
            
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

          
          @media screen and (min-width: 800px) and (min-height: 600px) {
      
            body {
              margin: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              height: auto;
            }
            
              
                
                .image-container {
                  position: absolute;
                  top: 110vh;
                  right: 5vh;
                  width: 40%;
                  height: 75%;
                  background-image: url('/cop.jpeg');
                  background-size: cover;
                  background-position: center;
                  border-radius: 0%;
                  z-index: 1;
                }
        
                .second-image-container {
                  position: absolute;
                  top: 148vh;
                  left: 5vh;
                  width: 40%;
                  height: 75%;
                  background-image: url('/jamie.jpg');
                  background-size: cover;
                  background-position: center;
                  border-radius: 0%;
                  margin-bottom: 110vh;
                  z-index: 1;
                }
                
              .team-container {
                  width: 80%;
                  margin: 0 auto;
                  display: flex;
                  flex-direction: column;
                  padding-top: 10vh;
              }
      
              .quienes-section {
                position: relative;
                margin-top: 40vh;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
              }
              
              .big-title {
                font-size: 5vw;
                text-align: center;
                color: #000;
                margin-bottom: 2vh;
              }
              
              .sub-title {
                font-size: 3vw;
                text-align: center;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
      
                .jp-text {
                  font-size: 18px;
                 
                  text-align: left;
                  width: 40%;
                  color: #333;
                  margin-top: 35vh;
                  left: 11vh;
                  padding-bottom: 15vh;
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

                .j-text {
                  font-size: 18px;
                  position: absolute;
                  text-align: right;
                  color: #333;
                  margin-top: 60vh;
                  right: 5vh;
                  width: 40%;
                  margin-bottom: 110vh;
                  
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
        
       
      `}</style>

<div className="team-container">
      <div className="quienes-section">
      <div className="big-title">
        Quienes somos?
      </div>

      <div className="sub-title" onClick={handleConocenosClick}>
        Conocenos!
      </div>
      </div>
      <div className="jp-container">
      <div className="jp-text">
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
      </div>

      <div className="j-container">
      <div className="j-text">
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
    </div>
    </Layout>
  );
};

export default Team;
