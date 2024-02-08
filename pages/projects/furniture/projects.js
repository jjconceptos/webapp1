import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import FurnitureProjectForm from '/pages/projects/furniture/manage/addProject';
import DelFurnitureProjectButton from 'pages/projects/furniture/manage/delProject';
import Layout from '/layouts/layout';
import { fetchFurnitureProjectsData } from '/utils/fetchFurnitureProjects';


function FurnitureProjects() {
  const { state } = useAuth();
  const [showFurnitureProjectForm, setShowFurnitureProjectForm] = useState(false);
  const [furnitureProjects, setFurnitureProjects] = useState([]);
  const [expandedFurnitureProject, setExpandedFurnitureProject] = useState(null);
  const [selectedFurnitureProject, setSelectedFurnitureProject] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);
  const [fullDescriptions, setFullDescriptions] = useState({});

 // Fetch projects when the component mounts
 useEffect(() => {
  const fetchData = async () => {
    try {
      const furnitureProjectsData = await fetchFurnitureProjectsData();
      const updatedFurnitureProjects = furnitureProjectsData.map((furnitureProject) => ({
        ...furnitureProject,
        name: furnitureProject.name.replace(/-/g, ' '),
        // Limit the description only if the project is not expanded
        description:
          expandedFurnitureProject === null
            ? furnitureProject.description.length > 8
              ? furnitureProject.description.slice(0, 8) + '...'
              : furnitureProject.description
            : furnitureProject.description,
      }));
      setFurnitureProjects(updatedFurnitureProjects);

      
       // Store the full descriptions separately
       const fullDescs = furnitureProjectsData.reduce(
        (acc, furnitureProject) => ({
          ...acc,
          [furnitureProject.name.replace(/-/g, ' ')]: furnitureProject.description,
        }),
        {}
      );
      setFullDescriptions(fullDescs);

    } catch (error) {
      console.error('Error fetching furnitureProducts:', error);
    }
  };

  fetchData();
}, [expandedFurnitureProject]);

  const handleFurnitureProjectAddClick = () => {
    setShowFurnitureProjectForm(true);
  };

  const handleCloseForm = () => {
    setShowFurnitureProjectForm(false);
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
      console.log('Updated furnitureProjects:', updatedFurnitureProjects);
    } catch (error) {
      console.error('Error handling added furnitureProject:', error);
    }
  };

  const handleFurnitureProjectSubmit = async (furnitureProject) => {
    if (furnitureProject.name && furnitureProject.description) {
      setShowFurnitureProjectForm(false);
      handleFurnitureProjectAdded(furnitureProject.name);
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
      <style jsx >{`

       body {
          
          margin: 0;
          padding: 0;
          display: flex;
          min-height: 80vh;
          max-height: 102vh;
          margin-bottom: 100vh;
        }
        
        .no-projects-centered {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .add-projects-section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30vh; /* Adjust the margin-top as needed */
        }
        
        .projects-section {
          margin-top: 35vh;
        }
       
        .projects-grid {
          position: relative;
          
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2vw;
          padding: 1.5vh;
         
        }
        
        .projects-card {
          border: 1px solid #ddd;
          padding: 1vw;
        }
        
        .enlarged-view {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.94);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .enlarged-project {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        .enlarged-project-img {
          width: 70vw;
          max-width: 100vw;
          height: auto;
          max-height: 70vh;
          object-fit: contain;
          margin: auto;
        }
        
        .enlarged-project-name {
          font-size: 3vw;
          color: #f3f0e9;
          margin-top: 10vh;
        }
        
        .enlarged-project-description {
          font-size: 2vw;
          color: #f3f0e9;
          white-space: pre-line;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        
        .close-button {
          position: absolute;
          top: 1vh;
          right: 1vw;
          background: none;
          border: none;
          font-size: 2.4vw;
          cursor: pointer;
          color: white;
          outline: none;
          transition: color 0.3s ease;
        }
        
        .close-button:hover {
          color: lightgray;
        }

        @media screen and (min-width: 800px) and (min-height: 600px) {
  
          body {
          
            margin: 0;
            padding: 0;
            display: flex;
            min-height: 80vh;
            max-height: 102vh;
            margin-bottom: 100vh;
          }
          
          .no-projects-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          
          .add-projects-section {
            position: relative;
            top: 30vh;
            left: 10vw;
            
            
          }
          
          .projects-section {
            margin-top: 35vh;
           
          }
         
          .projects-grid {
            position: relative;
            
            left: 0;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2vw;
            padding: 1.5vh;
           
          }
          
          .projects-card {
            border: 1px solid #ddd;
            padding: 1vw;
          }
          
          .enlarged-view {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.94);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 100;
          }
          
          .enlarged-project {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          
          .enlarged-project-img {
            width: 70vw;
            max-width: 100vw;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
            margin: auto;
          }
          
          .enlarged-project-name {
            font-size: 3vw;
            color: #f3f0e9;
            margin-top: 10vh;
          }
          
          .enlarged-project-description {
            font-size: 2vw;
            color: #f3f0e9;
            white-space: pre-line;
            overflow-wrap: break-word;
            max-width: 100%;
          }
          
          .close-button {
            position: absolute;
            top: 1vh;
            right: 1vw;
            background: none;
            border: none;
            font-size: 2.4vw;
            cursor: pointer;
            color: white;
            outline: none;
            transition: color 0.3s ease;
          }
          
          .close-button:hover {
            color: lightgray;
          } 
        
        }
       
      `}</style>
      <div className="projects-container">
      <div className="add-projects-section">
       <div>
      {isButtonVisible && (
        <button onClick={handleFurnitureProjectAddClick}>Add project</button>
      )}
      </div>
            {showFurnitureProjectForm && (
              <div>
                
                <FurnitureProjectForm
                  onSubmit={handleFurnitureProjectSubmit}
                  furnitureProjects={furnitureProjects}
                  onFurnitureProjectAdded={handleFurnitureProjectAdded}
                  onCloseForm={handleCloseForm} 
                />
              </div>
            )}
      </div>
      <div className="projects-section">
       <div className="projects-grid">
         {Array.isArray(furnitureProjects) && furnitureProjects.length > 0 ? (
           furnitureProjects.map((furnitureProject, index) => (
             <div
               key={index}
               className={`projects-card ${
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
                 <DelFurnitureProjectButton
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
               <img
                 className="enlarged-project-img"
                 src={selectedFurnitureProject.imageUrl}
                 alt={selectedFurnitureProject.name}
               />
             </div>
           </div>
           <div className="project-info">
             <h2 className="enlarged-project-name">{selectedFurnitureProject.name}</h2>
             <p className="enlarged-project-description">
               {fullDescriptions[selectedFurnitureProject.name] || selectedFurnitureProject.description}
             </p>
           </div>
         </div>
       )}
     </div>
     </div>
    </Layout>
  );
}

export default FurnitureProjects;