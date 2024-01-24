import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/interiors/manage/addProject';
import DelProjectButton from 'pages/projects/interiors/manage/delProject';
import Layout from '/layouts/layout';
import { fetchInteriorsProjectsData } from '/utils/fetchInteriorsProjects';
import '/layouts/styles.css';

function interiorsProjects() {
  const { state } = useAuth();
  const [showInteriorsProjectForm, setShowInteriorsProjectForm] = useState(false);
  const [interiorsProjects, setInteriorsProjects] = useState([]);
  const [expandedInteriorsProject, setExpandedInteriorsProject] = useState(null);
  const [selectedInteriorsProject, setSelectedInteriorsProject] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const interiorsProjectsData = await fetchInteriorsProjectsData();
        setInteriorsProjects(
          interiorsProjectsData.map((interiorsProject) => ({
            ...interiorsProject,
            description: interiorsProject.description.length > 8
              ? interiorsProject.description.slice(0, 8) + '...'
              : interiorsProject.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);

  const handleInteriorsProjectAddClick = () => {
    setShowInteriorsProjectForm(true);
  };

  const handleInteriorsProjectClick = (interiorsProject) => {
    if (interiorsProject) {
      setSelectedInteriorsProject(interiorsProject);
      setEnlargedView(!enlargedView);
      setShowInteriorsProjectForm(false);
    } else {
      setShowInteriorsProjectForm((prevShowInteriorsProjectForm) => !prevShowInteriorsProjectForm);
    }
  };

  const handleInteriorsProjectAdded = async () => {
    try {
      const updatedInteriorsProjects = await fetchInteriorsProjectsData();
      setInteriorsProjects(
        updatedInteriorsProjects.map((interiorsProject) => ({
          ...interiorsProject,
          description: interiorsProject.description.length > 8
            ? interiorsProject.description.slice(0, 8) + '...'
            : interiorsProject.description,
        }))
      );
      console.log('Updated projects:', updatedInteriorsProjects);
    } catch (error) {
      console.error('Error handling added project:', error);
    }
  };

  const handleInteriorsProjectSubmit = async (interiorsProject) => {
    if (interiorsProject.name && interiorsProject.description) {
      setShowInteriorsProjectForm(false);
      handleProjectAdded(interiorsProject.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteInteriorsProject = async (interiorsProjectName) => {
    try {
      const updatedInteriorsProjects = interiorsProjects.filter((interiorsProject) => interiorsProject.name !== interiorsProjectName);
      setInteriorsProjects(updatedInteriorsProjects);

      if (expandedInteriorsProject === interiorsProjectName) {
        setExpandedInteriorsProject(null);
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
            <button onClick={handleInteriorsProjectAddClick}>Add project</button>
          )}
        </div>
        {showInteriorsProjectForm && (
          <div>
            <h2></h2>
            <ProjectForm
              onSubmit={handleInteriorsProjectSubmit}
              interiorsProjects={interiorsProjects}
              onInteriorsProjectAdded={handleInteriorsProjectAdded}
            />
          </div>
        )}

        <div className="pro-grid">
          {Array.isArray(interiorsProjects) && interiorsProjects.length > 0 ? (
            interiorsProjects.map((interiorsProject, index) => (
              <div
                key={index}
                className={`pro-card ${
                  expandedInteriorsProject === index ? 'expanded' : ''
                }`}
              >
                <h3
                  onClick={() =>
                    setExpandedInteriorsProject(
                      expandedInteriorsProject === index ? null : index
                    )
                  }
                >
                  {interiorsProject.name}
                </h3>
                <p
                  className={`project-description ${
                    expandedInteriorsProject === index ? 'expanded' : ''
                  }`}
                >
                  {interiorsProject.description}
                </p>
                {interiorsProject.imageUrl && (
                  <img
                    src={interiorsProject.imageUrl}
                    alt={interiorsProject.name}
                    className={`project-image ${
                      expandedInteriorsProject === index ? 'expanded' : ''
                    }`}
                    onClick={() => handleInteriorsProjectClick(interiorsProject)}
                  />
                )}
                {isButtonVisible && (
                  <DelProjectButton
                  interiorsProjectName={interiorsProject.name}
                    onDeleteInteriorsProject={handleDeleteInteriorsProject}
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
                className={`${Array.isArray(interiorsProjects) &&
                  interiorsProjects.length === 0
                  ? ''
                  : ''}`}
              >
                No projects to display.
              </p>
            </div>
          )}
        </div>

        {enlargedView && selectedInteriorsProject && (
          <div className="enlarged-project">
            <h2>{selectedInteriorsProject.name}</h2>
            <p>{selectedInteriorsProject.description}</p>
            <img
              src={selectedInteriorsProject.imageUrl}
              alt={selectedInteriorsProject.name}
              className="enlarged-project-image"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default interiorsProjects;