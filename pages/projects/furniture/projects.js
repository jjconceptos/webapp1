import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/furniture/manage/addProject';
import DelProjectButton from 'pages/projects/furniture/manage/delProject';
import Layout from '/layouts/layout';
import { fetchFurnitureProjectsData } from '/utils/fetchFurnitureProjects';
import '/layouts/styles.css';

function FurnitureProjects() {
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
      <style jsx>{`
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

        .enlarged-view {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8); /* Adjust transparency as needed */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100; /* Higher z-index than other elements */
        }

        /* New class for the container within the enlarged view */
        .enlarged-container {
          max-width: 80%; /* Adjust as needed */
          max-height: 80vh; /* Adjust as needed */
          overflow: hidden;
        }

        .enlarged-project {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Align to the left */
          justify-content: center;
        }
        
        .enlarged-project-img {
          width: 80%; /* Adjust the width as needed */
          max-width: 100%;
          height: auto;
          max-height: 80vh; /* Adjust the height as needed */
          object-fit: contain;
          margin-left: 10%; /* Adjust the left margin as needed */
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: white; /* Adjust as needed */
          outline: none;
          transition: color 0.3s ease;
        }
        
        .close-button:hover {
          color: lightgray; /* Adjust hover color as needed */
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
  <div className="enlarged-view">
    <div className="enlarged-container">
      <div className="enlarged-project">
        <button className="close-button" onClick={() => setEnlargedView(false)}>X</button>
        <h2>{selectedFurnitureProject.name}</h2>
        <p>{selectedFurnitureProject.description}</p>
        <img
          className="enlarged-project-img"
          src={selectedFurnitureProject.imageUrl}
          alt={selectedFurnitureProject.name}
        />
      </div>
    </div>
  </div>
)}

      </div>
    </Layout>
  );
}

export default FurnitureProjects;