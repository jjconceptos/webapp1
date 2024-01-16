import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '/auth/authContext';
import 'layouts/styles.css';

const Layout = ({ children }) => {
  const { state } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [centeredContent, setCenteredContent] = useState(false);

  

  return (
    <div>
      {/* Include the Google Fonts stylesheet */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
        rel="stylesheet"
      />

      
          <ul>
          <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/home/home">Inicio</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/about/about">Acerca</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/about/team">Equipo</Link>
            </li>
            {/* <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/projects/projects">Projects</Link>
            </li> */}
            
            
           
            {state.clearanceLevel <= 2 && state.clearanceLevel > 0 && (
              <li onClick={() => setIsSidebarOpen(false)}>
                <Link href="/master/master">Master</Link>
              </li>
            )}
            {/*<li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/hub/hub">Hub</Link>
            </li>*/}
          </ul>
       
{/* Main Content */}

        

        {/* Content */}
        <div className={`content-container ${centeredContent ? 'centered' : ''}`}>
          {children}
        </div>
     

      
      <footer>
        {/* */}
        <div style={{ marginLeft: '25%', bottom: '10px', fontSize: '10px'}}>
          <div >Contacto:</div>
          <div>
          Arquitecto Juan Pablo Gonzalez Andrade
          + 52 55 2344 3501
          </div>
          <div >
          Ing. Jaime Rodriguez Flores
          + 52 55 1079 1185
          </div>
          <div >
          3 Reyes 18 Colonia Navidad, Ciudad de Mexico, 05219
          </div>
          </div>
          
          <div style={{ marginLeft: '55%', marginTop: '-62px', fontSize: '10px'}}>
          <div >Cuenta:</div>
            <div >
          <a href="/register/registerForm.js">Registrarse</a>
          </div>
          <div >
            <a href="/login/login">Iniciar sesion</a>
          </div>
          </div>
           
        <div style={{ textAlign: 'left',  marginTop: '-5px', paddingLeft: '10px', fontSize: '14px'}}>
          <p> &copy; {new Date().getFullYear()} JRF. All rights reserved.</p>
        </div>
        
      </footer>

      {/* Styles */}
      <style jsx global>{`
        body {
          background-image: url('/plastic.jpg'); // Adjust the path accordingly
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
          margin-left: ${isSidebarOpen ? '250px' : '0'}; /* Adjust the margin based on sidebar state */
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
      
        .rice-figure {
          width: 20px;
          height: 20px;
          background-color: ${isSidebarOpen ? '#fff' : '#000'};
          border-radius: 50%;
          position: fixed;
          top: 15px;
          left: ${isSidebarOpen ? '265px' : '15px'}; /* Adjust the left position based on sidebar state */
          cursor: pointer;
          z-index: 4; /* Set a higher z-index than the toggle-sidebar */
          transition: left 0.5s, background-color 0.5s; /* Add this line for smooth transition */
        }
      
        .sidebar-open .rice-figure {
          left: 265px; /* Adjust the left position when the sidebar is open */
          background-color: ${isSidebarOpen ? '#999' : '#000'}; /* Change the color when the sidebar is open */
        }
      
        /*  */
        footer {
          position: fixed;
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 11vh;
          background-color: rgba(52, 73, 94);
          padding: 10px;
          
          color: black;
          font-size: 10px;
          opacity: 0.8;
          z-index: 2; /* Set z-index higher than the body */
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
