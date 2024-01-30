import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/interiors/manage/addProject';
import DelProjectButton from 'pages/projects/interiors/manage/delProject';
import Layout from '/layouts/layout';
import { fetchInteriorsProjectsData } from '/utils/fetchInteriorsProjects';


function InteriorsProjects() {
  const { state } = useAuth();
  const [showInteriorsProjectForm, setShowInteriorsProjectForm] = useState(false);
  const [interiorsProjects, setInteriorsProjects] = useState([]);
  const [expandedInteriorsProject, setExpandedInteriorsProject] = useState(null);
  const [selectedInteriorsProject, setSelectedInteriorsProject] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);
  const [fullDescriptions, setFullDescriptions] = useState({});

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const interiorsProjectsData = await fetchInteriorsProjectsData();
        const updatedInteriorsProjects = interiorsProjectsData.map((interiorsProject) => ({
          ...interiorsProject,
          // Limit the description only if the project is not expanded
          description:
            expandedInteriorsProject === null
              ? interiorsProject.description.length > 8
                ? interiorsProject.description.slice(0, 8) + '...'
                : interiorsProject.description
              : interiorsProject.description,
        }));
        setInteriorsProjects(updatedInteriorsProjects);

        // Store the full descriptions separately
        const fullDescs = interiorsProjectsData.reduce(
          (acc, interiorsProject) => ({
            ...acc,
            [interiorsProject.name]: interiorsProject.description,
          }),
          {}
        );
        setFullDescriptions(fullDescs);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchData();
  }, [expandedInteriorsProject]);

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

        .pro-grid {
          position: absolute;
          top: 50%;
          left: 0%; /* Adjust as needed to move it to the right */
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding:15px;
          border-radius: 10px;
        }
        
        .pro-card {
          border: 1px solid #ddd;
          padding: 10px;
        }

        .enlarged-view {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.94); /* Adjust transparency as needed */
          display: flex;
          z-index: 100; /* Higher z-index than other elements */
        }

        
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
          width: 80%; 
          max-width: 100%;
          height: auto;
          max-height: 80vh; 
          object-fit: contain;
          margin-left: 15%;
          margin-top: 10%;
        }

        .project-name {
         
        }
      
        .project-description {
         
        }

        .enlarged-project-name {
          font-size: 3vw; /* Adjust font size as needed */
          margin-left: 20%; /* Adjust margin-left as needed */
          margin-top: 5%; /* Adjust margin-top as needed */
          color: #f3f0e9;
        }
      
        .enlarged-project-description {
          font-size: 2vw;
          margin-left: 20%;
          margin-top: 2%;
          color: #f3f0e9;
          white-space: pre-line; /* Preserve newlines and spaces */
          overflow-wrap: break-word; /* Wrap long words */
          max-width: 60%; /* Adjust as needed */
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

        @media only screen and (max-width: 600px) {

          .no-projects-centered {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
  
          .add-projects {
            position: absolute;
            top: 14%;
            left: 20%;
            transform: translate(-50%, -50%);
          }
  
          .pro-grid {
            position: absolute;
            top: 50%;
            left: 0%; /* Adjust as needed to move it to the right */
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding:15px;
            border-radius: 10px;
          }
          
          .pro-card {
            border: 1px solid #ddd;
            padding: 10px;
          }
  
          .enlarged-view {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.94); /* Adjust transparency as needed */
            display: flex;
            z-index: 100; /* Higher z-index than other elements */
          }
  
          
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
            width: 80%; 
            max-width: 100%;
            height: auto;
            max-height: 80vh; 
            object-fit: contain;
            margin-left: 15%;
            margin-top: 10%;
          }
  
          .project-name {
           
          }
        
          .project-description {
           
          }
  
          .enlarged-project-name {
            font-size: 3vw; /* Adjust font size as needed */
            margin-left: 20%; /* Adjust margin-left as needed */
            margin-top: 5%; /* Adjust margin-top as needed */
            color: #f3f0e9;
          }
        
          .enlarged-project-description {
            font-size: 2vw;
            margin-left: 20%;
            margin-top: 2%;
            color: #f3f0e9;
            white-space: pre-line; /* Preserve newlines and spaces */
            overflow-wrap: break-word; /* Wrap long words */
            max-width: 60%; /* Adjust as needed */
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

       
        @media only screen and (min-width: 601px) and (max-width: 768px) {
          
        }


        @media only screen and (min-width: 769px) and (max-width: 1024px) {
          
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
         <div className="enlarged-view">
           <div className="enlarged-container">
             <div className="enlarged-project">
               <button className="close-button" onClick={() => setEnlargedView(false)}>X</button>
               <img
                 className="enlarged-project-img"
                 src={selectedInteriorsProject.imageUrl}
                 alt={selectedInteriorsProject.name}
               />
             </div>
           </div>
           <div className="project-info">
             <h2 className="enlarged-project-name">{selectedInteriorsProject.name}</h2>
             <p className="enlarged-project-description">
               {fullDescriptions[selectedInteriorsProject.name] || selectedInteriorsProject.description}
             </p>
           </div>
         </div>
       )}

     </div>
    </Layout>
  );
}

export default InteriorsProjects;