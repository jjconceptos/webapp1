// ProjectsLandingPage.js
import React from 'react';
import Layout from '/layouts/layout';

const ProjectsLandingPage = () => {
  return (
    <Layout>
      <style jsx global>{`
        .project-links {
            position: absolute;
            top: 20%;
            right: 5%; /* Adjust as needed to move it to the right */
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            padding:15px;
        }

        .project-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px; /* Adjust as needed */
          height: 200px; /* Adjust as needed */
          background-color: #e0e0e0; /* Placeholder color */
          border-radius: 0px; /* Adjust as needed */
          text-decoration: none;
          color: #333; /* Adjust text color */
          font-weight: bold;
        }

        .project-link img {
          width: 60%; /* Adjust as needed */
          height: 60%; /* Adjust as needed */
          object-fit: contain;
        }
      `}</style>
      
      <div className="project-links">
        <a href="/projects/furniture/projects" className="project-link">
          <img src="/muebles-icon.png" alt="Muebles Icon" />
          Muebles
        </a>

        <a href="/projects/interiors/projects" className="project-link">
          <img src="/interiorismo-icon.png" alt="Interiorismo Icon" />
          Interiorismo
        </a>

        <a href="/projects/conceptos/projects" className="project-link">
          <img src="/conceptos-icon.png" alt="Conceptos Icon" />
          Conceptos
        </a>
      </div>
    </Layout>
  );
};

export default ProjectsLandingPage;
