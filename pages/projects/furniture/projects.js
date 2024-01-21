import React, { useState, useEffect } from 'react';
import Link from 'next/link';  // Import Link from next/link
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/manage/addProject';
import DelProjectButton from 'pages/projects/manage/delProject';
import Layout from '/layouts/layout';
import '/layouts/styles.css';
import { fetchProjectsData } from '/utils/fetchProjects';

function Projects() {
  // ... (existing code)

  return (
    <Layout>
      {/* ... (existing code) */}

      <div className="pro-grid">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className={`pro-card ${
                expandedProject === index ? 'expanded' : ''
              }`}
            >
              <h3
                onClick={() =>
                  setExpandedProject(
                    expandedProject === index ? null : index
                  )
                }
              >
                {project.name}
              </h3>
              <p
                className={`project-description ${
                  expandedProject === index ? 'expanded' : ''
                }`}
              >
                {project.description}
              </p>
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className={`project-image ${
                    expandedProject === index ? 'expanded' : ''
                  }`}
                  onClick={() => handleProjectClick(project)}
                />
              )}
              {isButtonVisible && (
                <DelProjectButton
                  projectName={project.name}
                  onDeleteProject={handleDeleteProject}
                />
              )}
            </div>
          ))
        ) : (
          <div className="no-projects-centered">
            <p
              style={{
                marginLeft: '10%',
                zIndex: 1,
              }}
              className={`${Array.isArray(projects) &&
                projects.length === 0
                ? ''
                : ''}`}
            >
              No projects to display.
            </p>
          </div>
        )}
      </div>

      {enlargedView && selectedProject && (
        <div className="enlarged-project">
          <h2>{selectedProject.name}</h2>
          <p>{selectedProject.description}</p>
          <img
            src={selectedProject.imageUrl}
            alt={selectedProject.name}
            className="enlarged-project-image"
          />
        </div>
      )}
    </Layout>
  );
}

export default Projects;
