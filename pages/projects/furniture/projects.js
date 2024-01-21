import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/manage/addProject';
import DelProjectButton from 'pages/projects/manage/delProject';
import Layout from '/layouts/layout';
import { fetchProjectsData } from '/utils/fetchProjects';
import '/layouts/styles.css';

function Projects() {
  const { state } = useAuth();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetchProjectsData();
        setProjects(
          projectsData.map((project) => ({
            ...project,
            description: project.description.length > 8
              ? project.description.slice(0, 8) + '...'
              : project.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);

  const handleProjectAddClick = () => {
    setShowProjectForm(true);
  };

  const handleProjectClick = (project) => {
    if (project) {
      setSelectedProject(project);
      setEnlargedView(!enlargedView);
      setShowProjectForm(false);
    } else {
      setShowProjectForm((prevShowProjectForm) => !prevShowProjectForm);
    }
  };

  const handleProjectAdded = async () => {
    try {
      const updatedProjects = await fetchProjectsData();
      setProjects(
        updatedProjects.map((project) => ({
          ...project,
          description: project.description.length > 8
            ? project.description.slice(0, 8) + '...'
            : project.description,
        }))
      );
      console.log('Updated projects:', updatedProjects);
    } catch (error) {
      console.error('Error handling added project:', error);
    }
  };

  const handleProjectSubmit = async (project) => {
    if (project.name && project.description) {
      setShowProjectForm(false);
      handleProjectAdded(project.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteProject = async (projectName) => {
    try {
      const updatedProjects = projects.filter((project) => project.name !== projectName);
      setProjects(updatedProjects);

      if (expandedProject === projectName) {
        setExpandedProject(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isButtonVisible = state.clearanceLevel == 1 || state.clearanceLevel == 2;

  return (
    <Layout>
      <style jsx global>{`
        .no-projects-centered {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .add-projects {
          position: absolute;
          top: 14%;
          left: 10%;
          transform: translate(-50%, -50%);
        }
      `}</style>
      <div>
        <div className="add-projects">
          {isButtonVisible && (
            <button onClick={handleProjectAddClick}>Add project</button>
          )}
        </div>
        {showProjectForm && (
          <div>
            <h2></h2>
            <ProjectForm
              onSubmit={handleProjectSubmit}
              projects={projects}
              onProjectAdded={handleProjectAdded}
            />
          </div>
        )}

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
      </div>
    </Layout>
  );
}

export default Projects;
