import React, { useState } from 'react';

const DelFurnitureProjectButton = ({ furnitureProjectName, onDeleteFurnitureProject }) => {
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  console.log("furnitureProjectName (delProject.js): ", furnitureProjectName)


  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the project "${furnitureProjectName}"?`)) {
      setShowDeleteInput(true); // Show the delete input when the delete button is clicked
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteInput === furnitureProjectName) {
        // Send a request to delete the project text data
        const responseText = await fetch('/api/projects/furniture/delText', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProjectName,
          }),
        });
  
        // Send a request to delete the project name
        const responseNames = await fetch('/api/projects/furniture/delProjectNames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProjectName,
          }),
        });
  
        // Send a request to delete the project image
        const responseImage = await fetch('/api/projects/furniture/delImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProjectName,
          }),
        });
        console.log(responseText);
        console.log(responseNames);
        console.log(responseImage);
  
        if (responseText.ok && responseNames.ok && responseImage.ok) {
          // Update the state to remove the deleted project
          onDeleteFurnitureProject(furnitureProjectName);
  
          // Clear the delete input and hide it
          setDeleteInput('');
          setShowDeleteInput(false);
        } else {
          console.error('Project deletion failed');
        }
      } else {
        console.error('Confirmation text does not match project name');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <button onClick={handleDelete}>Delete Project</button>
      {showDeleteInput && (
        <div>
          <input
            type="text"
            placeholder={`Type "${furnitureProjectName}" to confirm deletion`}
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <button onClick={handleConfirmDelete}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DelFurnitureProjectButton;
