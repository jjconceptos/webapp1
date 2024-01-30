import React from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';

const ProjectsLandingPage = () => {
  return (
    <Layout>
      <style jsx global>{`
        .project-links {
          position: absolute;
          top: 20%;
          right: 5%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          padding: 15px;
        }

        .project-link {
          position: relative;
          width: 200px;
          height: 200px;
          background-color: #e0e0e0;
          border-radius: 10px;
          background-size: cover;
          overflow: hidden;
          cursor: pointer; /* Add pointer cursor for the clickable effect */
        }

        .project-link img {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
        }

        .project-link-text-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          padding: 10px; /* Adjust as needed for spacing between icon and text */
          background: rgba(255, 255, 255, 0.8); /* Add a semi-transparent background for better readability */
        }

        .project-link-text {
          color: #333;
          font-weight: bold;
        }

        @media only screen and (max-width: 600px) {
          
          .project-links {
            position: absolute;
            top: 40%; /* Center vertically */
            left: 41.7%; /* Center horizontally */
            transform: translate(-50%, -50%); /* Centering trick */
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            padding: 15px;
          }
  
          .project-link {
            position: relative;
            width: 100px;
            height: 100px;
            background-color: #e0e0e0;
            border-radius: 100%;
            background-size: cover;
            overflow: hidden;
            cursor: pointer; /* Add pointer cursor for the clickable effect */
          }
  
          .project-link img {
            width: 100%;
            height: auto;
            object-fit: contain;
            
          }
  
          .project-link-text-container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            padding: 10px; /* Adjust as needed for spacing between icon and text */
            background: rgba(255, 255, 255, 0.8); /* Add a semi-transparent background for better readability */
          }
  
          .project-link-text {
            color: #333;
            font-weight: bold;
            font-size: 9px;
          }
  

        }

       
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          
        }


        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          
        }

      `}</style>

      <div className="project-links">
        <Link href="/projects/furniture/projects">
          <div className="project-link" style={{ backgroundImage: 'url(/furnitureIcon.png)' }}>
            <div className="project-link-text-container">
              <div className="project-link-text">Muebles</div>
            </div>
          </div>
        </Link>

        <Link href="/projects/interiors/projects">
          <div className="project-link" style={{ backgroundImage: 'url(/interiorsIcon.jpg)' }}>
            <div className="project-link-text-container">
              <div className="project-link-text">Interiorismo</div>
            </div>
          </div>
        </Link>
{/*
        <Link href="/projects/conceptos/projects">
          <div className="project-link" style={{ backgroundImage: 'url(/conceptos-icon.png)' }}>
            <div className="project-link-text-container">
              <div className="project-link-text">Conceptos</div>
            </div>
          </div>
        </Link>
        */}
      </div>
    </Layout>
  );
};

export default ProjectsLandingPage;

