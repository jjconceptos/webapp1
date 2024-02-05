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
        <li><Link href="/home/home">Inicio</Link></li>
        <li><Link href="/about/about">Acerca</Link></li>
        <li><Link href="/about/team">Equipo</Link></li>
        <li><Link href="/projects/projectsLandingPage">Proyectos</Link></li>
        <li><Link href="/products/productsLandingPage">Productos</Link></li>

      </ul>

      {/* Main Content */}
      <div className={`content-container ${centeredContent ? 'centered' : ''}`}>
        {children}
      </div>

      <footer>
  <div className="footer-section">
    <div>3 Reyes 18 Colonia Navidad, Ciudad de Mexico, 05219</div>
  </div>
  <div className="footer-section">
    <div><a href="/register/registerForm">Registrarse</a></div>
    <div><a href="/login/login">Iniciar sesion</a></div>
    <div>
  {state.clearanceLevel <= 1 && state.clearanceLevel > 0 && (
          <a href="/master/master">Master</a>
        )}
  </div>
  </div>
  <div className="footer-section">
  <a href="/forms/schedule">Agenda una cita</a>
</div>
  <div className="footer-section">
    <a href="/brands/brands">Marcas favoritas</a>
  </div>
  <div className="footer-section">
    <a href="https://www.jrf.one" target="_blank" rel="noopener noreferrer">&copy; {new Date().getFullYear()} JRF. All rights reserved.</a>
  </div>
  
</footer>


      {/* Styles */}
      <style jsx global>{`
        body {
          background-size: cover;
          background-repeat: repeat;
          background-attachment: fixed;
          background-position: center;
          margin: 0;
          padding: 0;
          display: flex;
          min-height: 80vh;
          max-height: 102vh;
          margin-bottom: 100vh;
        }

        ul {
          
          display: flex;
          position: absolute;
          top: 5%;
          left: 50%; /* Center the list horizontally */
          transform: translateX(-50%); /* Adjust to center the list */
          z-index: 2;
          display: grid; /* Use CSS Grid */
          grid-template-columns: repeat(5, 1fr); /* Adjust the number of columns as needed */
          gap: 5.5vw;
        }
        
        li {
          
          
          font-size: 2.5vw; /* Adjust font size as needed for responsiveness */
        }
        
       

        

        .content-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        footer {
          position: fixed;
          bottom: 0;
          margin-top: 5vh;
          width: 100%;
          background-color: rgba(52, 73, 94);
          padding: 10px;
          color: white;
          opacity: 0.8;
          z-index: 2;
          display: grid; /* Use CSS Grid */
          grid-template-columns: repeat(5, 1fr); /* Adjust the number of columns as needed */
          align-items: center;
          
          gap: 10px; /* Add some space between columns */
        }
        
        .footer-section {
          font-size: .9vw; /* Adjust font size as needed */
          max-width: 150px; /* Set a max-width for responsiveness */
          display: flex;
          flex-direction: column; /* Arrange items vertically within each column */
          align-items: center;
          margin: 0 auto;
        }
        


        .content-container.centered {
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Layout;
