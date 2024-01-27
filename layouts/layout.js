import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '/auth/authContext';
import 'layouts/styles.css';

const Layout = ({ children }) => {
  const { state } = useAuth();
  
  const [centeredContent, setCenteredContent] = useState(false);

  

  return (
    <div>
      {/* Include the Google Fonts stylesheet */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
        rel="stylesheet"
      />

      
          <ul>
          <li >
              <Link href="/home/home">Inicio</Link>
            </li>
            <li >
              <Link href="/about/about">Acerca</Link>
            </li>
            <li >
              <Link href="/about/team">Equipo</Link>
            </li>
           <li >
              <Link href="/projects/projectsLandingPage">Proyectos</Link>
            </li> {/* */}
            <li >
              <Link href="/products/productsLandingPage">Productos</Link>
            </li> {/* */}
            
            
           
            {state.clearanceLevel <= 1 && state.clearanceLevel > 0 && (
              <li >
                <Link href="/master/master">Master</Link>
              </li>
            )}
            {/*<li >
              <Link href="/hub/hub">Hub</Link>
            </li>*/}
          </ul>
       
{/* Main Content */}

        

        {/* Content */}
        <div className={`content-container ${centeredContent ? 'centered' : ''}`}>
          {children}
        </div>
     

      
        <footer>
  {/* Contacto */}
  <div className="footer-section">
    <div>Contacto:</div>
    
    <div>3 Reyes 18 Colonia Navidad, Ciudad de Mexico, 05219</div>
  </div>

  {/* Cuenta */}
  <div className="footer-section">
    <div>Cuenta:</div>
    <div><a href="/register/registerForm">Registrarse</a></div>
    <div><a href="/login/login">Iniciar sesion</a></div>
  </div>

  {/* Agenda una cita en linea */}
  <div className="footer-section">
    <div>Agenda una cita en linea:</div>
    <div>Escribe a: jjconceptos21@gmail.com</div>
  </div>

  {/* Colaboraciones */}
  <div className="footer-section">
    <div>Colaboraciones:</div>
    <div><a href="/brands/brands">Marcas favoritas</a></div>
  </div>

  {/* Copyright */}
  <div className="footer-copyright">
    <p>
      <a href="https://www.jrf.one" target="_blank" rel="noopener noreferrer">&copy; {new Date().getFullYear()} JRF. All rights reserved.</a>
    </p>
  </div>
</footer>

      {/* Styles */}
      <style jsx global>{`
        body {
          {/*  background-image: url('/concrete.jpg'); */}
          background-size: cover;
          background-repeat: repeat; // Choose the appropriate repeat style
          background-attachment: fixed;
          background-position: center;
          margin: 0;
          padding: 0;
          display: flex;
          min-height: 100vh; /* Ensure the body takes at least the full viewport height */
        }
      
        ul {
          list-style: none;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap; /* Ensure flex items wrap on smaller screens */
          align-items: center;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2; // Ensure it appears above other elements
        }

        li {
          margin: 10px;
        }

        ul.nav-links-right {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 20px;
          z-index: 2; // Ensure it appears above other elements
        }

        li.nav-links-right {
          justify-content: flex-end;
          right: 20px;
        }
      
        .main-content {
          display: flex;
          flex-direction: column;
          transition: margin-left 0.5s; /* Add this line for smooth transition */
          
          z-index: 1; /* Set z-index lower than the sidebar */
          width: 100%; /* Make sure it takes the full width */
        }
      
        .content-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%; /* Make sure it takes the full width */
          
        }
      
        .toggle-sidebar {
          position: fixed;
          top: 10px;
          left: 10px;
          cursor: pointer;
          z-index: 3; /* Set a higher z-index than main-content */
        }
      
        footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 10vh;
          background-color: rgba(52, 73, 94);
          padding: 10px;
          color: black;
          font-size: 1vw; /* Adjusted for responsiveness */
          opacity: 0.8;
          z-index: 2;
          display: flex;
          flex-direction: row; /* Arrange items in a row */
          align-items: center; /* Align items vertically in the middle */
          justify-content: space-between; /* Add space between items */
        }
      
        .footer-section {
          font-size: 0.8vw; /* Adjusted for responsiveness */
          margin-right: 20px; /* Add some space between sections */
          display: flex;
          flex-direction: column; /* Arrange items in a column inside each section */
        }
      
        .footer-copyright {
          font-size: 1vw; /* Adjusted for responsiveness */
          margin-top: 1%;
          margin-right: 1%;
        }
        
        .content-container.centered {
          justify-content: center;
          align-items: center;
        }

        @media only screen and (max-width: 600px) {
          ul {
           
            display: flex;
            
            flex-wrap: wrap; /* Ensure flex items wrap on smaller screens */
            align-items: center;
            margin: 0;
            padding: 0;
            position: static;
            margin-top: 10px;
            margin-left: 5px;
            z-index: 2; // Ensure it appears above other elements
            font-size: 12px;
          }
        
          ul li {
            margin: 5px; /* Adjusted margin for more compact spacing */
          }
        
          footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 8vh;
            background-color: rgba(52, 73, 94);
            padding: 10px;
            color: black;
            font-size: 1vw; /* Adjusted for responsiveness */
            opacity: 0.8;
            z-index: 2;
            display: flex;
            flex-direction: row; /* Arrange items in a row */
            align-items: center; /* Align items vertically in the middle */
            justify-content: space-between; /* Add space between items */
          }
        
          .footer-section {
            font-size: 1.5vw; /* Adjusted for responsiveness */
            margin-right: 20px; /* Add some space between sections */
            display: flex;
            flex-direction: column; /* Arrange items in a column inside each section */
          }
        
          .footer-copyright {
            font-size: 2vw; /* Adjusted for responsiveness */
            margin-top: 2%;
            margin-right: 1%;
          }
        }

        /* Media query for screens between 601px and 768px */
@media only screen and (min-width: 601px) and (max-width: 768px) {
  ul {
    /* Add specific styles for this screen size */
  }

  footer {
    /* Add specific styles for this screen size */
  }
}

/* Media query for screens between 769px and 1024px */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  ul {
    /* Add specific styles for this screen size */
  }

  footer {
    /* Add specific styles for this screen size */
  }
}

      `}</style>
    </div>
  );
};

export default Layout;
