import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/furniture/manage/addProject';
import DelProjectButton from 'pages/projects/furniture/manage/delProject';
import Layout from '/layouts/layout';
import { fetchFurnitureProjectsData } from '/utils/fetchFurnitureProjects';
import '/layouts/styles.css';

function furnitureProjects() {
  const { state } = useAuth();
  const [showFurnitureProjectForm, setShowFurnitureProjectForm] = useState(false);
  const [furnitureProjects, setFurnitureProjects] = useState([]);
  const [expandedFurnitureProject, setExpandedFurnitureProject] = useState(null);
  const [selectedFurnitureProject, setSelectedFurnitureProject] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const furnitureProjectsData = await fetchFurnitureProjectsData();
        setFurnitureProjects(
          furnitureProjectsData.map((furnitureProject) => ({
            ...furnitureProject,
            description: furnitureProject.description.length > 8
              ? furnitureProject.description.slice(0, 8) + '...'
              : furnitureProject.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);

  const handleFurnitureProjectAddClick = () => {
    setShowFurnitureProjectForm(true);
  };

  const handleFurnitureProjectClick = (furnitureProject) => {
    if (furnitureProject) {
      setSelectedFurnitureProject(furnitureProject);
      setEnlargedView(!enlargedView);
      setShowFurnitureProjectForm(false);
    } else {
      setShowFurnitureProjectForm((prevShowFurnitureProjectForm) => !prevShowFurnitureProjectForm);
    }
  };

  const handleFurnitureProjectAdded = async () => {
    try {
      const updatedFurnitureProjects = await fetchFurnitureProjectsData();
      setFurnitureProjects(
        updatedFurnitureProjects.map((furnitureProject) => ({
          ...furnitureProject,
          description: furnitureProject.description.length > 8
            ? furnitureProject.description.slice(0, 8) + '...'
            : furnitureProject.description,
        }))
      );
      console.log('Updated projects:', updatedFurnitureProjects);
    } catch (error) {
      console.error('Error handling added project:', error);
    }
  };

  const handleFurnitureProjectSubmit = async (furnitureProject) => {
    if (furnitureProject.name && furnitureProject.description) {
      setShowFurnitureProjectForm(false);
      handleProjectAdded(furnitureProject.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteFurnitureProject = async (furnitureProjectName) => {
    try {
      const updatedFurnitureProjects = furnitureProjects.filter((furnitureProject) => furnitureProject.name !== furnitureProjectName);
      setFurnitureProjects(updatedFurnitureProjects);

      if (expandedFurnitureProject === furnitureProjectName) {
        setExpandedFurnitureProject(null);
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
            <button onClick={handleFurnitureProjectAddClick}>Add project</button>
          )}
        </div>
        {showFurnitureProjectForm && (
          <div>
            <h2></h2>
            <ProjectForm
              onSubmit={handleFurnitureProjectSubmit}
              furnitureProjects={furnitureProjects}
              onFurnitureProjectAdded={handleFurnitureProjectAdded}
            />
          </div>
        )}

        <div className="pro-grid">
          {Array.isArray(furnitureProjects) && furnitureProjects.length > 0 ? (
            furnitureProjects.map((furnitureProject, index) => (
              <div
                key={index}
                className={`pro-card ${
                  expandedFurnitureProject === index ? 'expanded' : ''
                }`}
              >
                <h3
                  onClick={() =>
                    setExpandedFurnitureProject(
                      expandedFurnitureProject === index ? null : index
                    )
                  }
                >
                  {furnitureProject.name}
                </h3>
                <p
                  className={`project-description ${
                    expandedFurnitureProject === index ? 'expanded' : ''
                  }`}
                >
                  {furnitureProject.description}
                </p>
                {furnitureProject.imageUrl && (
                  <img
                    src={furnitureProject.imageUrl}
                    alt={furnitureProject.name}
                    className={`project-image ${
                      expandedFurnitureProject === index ? 'expanded' : ''
                    }`}
                    onClick={() => handleFurnitureProjectClick(furnitureProject)}
                  />
                )}
                {isButtonVisible && (
                  <DelProjectButton
                    furnitureProjectName={furnitureProject.name}
                    onDeleteFurnitureProject={handleDeleteFurnitureProject}
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
                className={`${Array.isArray(furnitureProjects) &&
                  furnitureProjects.length === 0
                  ? ''
                  : ''}`}
              >
                No projects to display.
              </p>
            </div>
          )}
        </div>

        {enlargedView && selectedFurnitureProject && (
          <div className="enlarged-project">
            <h2>{selectedFurnitureProject.name}</h2>
            <p>{selectedFurnitureProject.description}</p>
            <img
              src={selectedFurnitureProject.imageUrl}
              alt={selectedFurnitureProject.name}
              className="enlarged-project-image"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default furnitureProjects;