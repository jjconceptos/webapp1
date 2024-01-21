import React from 'react';
import Link from 'next/link';  // Import Link from next/link
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
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 200px;
          background-color: #e0e0e0;
          border-radius: 10px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }

        .project-link img {
          width: 60%;
          height: 60%;
          object-fit: contain;
        }
      `}</style>

      <div className="project-links">
        <Link href="/projects/furniture/projects">  {/* Use Link instead of a */}
          <a className="project-link">
            <img src="/muebles-icon.png" alt="Muebles Icon" />
            Muebles
          </a>
        </Link>

        <Link href="/projects/interiors/projects">  {/* Use Link instead of a */}
          <a className="project-link">
            <img src="/interiorismo-icon.png" alt="Interiorismo Icon" />
            Interiorismo
          </a>
        </Link>

        <Link href="/projects/conceptos/projects">  {/* Use Link instead of a */}
          <a className="project-link">
            <img src="/conceptos-icon.png" alt="Conceptos Icon" />
            Conceptos
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default ProjectsLandingPage;
