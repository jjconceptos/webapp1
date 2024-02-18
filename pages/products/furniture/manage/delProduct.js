import React, { useState } from 'react';

const DelFurnitureProductButton = ({ furnitureProductName, onDeleteFurnitureProduct }) => {
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  console.log("furnitureProductName (delProduct.js): ", furnitureProductName)

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the project "${furnitureProductName}"?`)) {
      setShowDeleteInput(true); // Show the delete input when the delete button is clicked
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteInput === furnitureProductName) {
        // Send a request to delete the project text data
        const responseText = await fetch('/api/products/furniture/delText', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProductName,
          }),
        });
  
        // Send a request to delete the project name
        const responseNames = await fetch('/api/products/furniture/delProductNames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProductName,
          }),
        });
  
        // Send a request to delete the project image
        const responseImage = await fetch('/api/products/furniture/delImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProductName,
          }),
        });
        console.log(responseText);
        console.log(responseNames);
        console.log(responseImage);
  
        if (responseText.ok && responseNames.ok && responseImage.ok) {
          // Update the state to remove the deleted project
          onDeleteFurnitureProduct(furnitureProductName);
  
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
      <button onClick={handleDelete}>Delete Product</button>
      {showDeleteInput && (
        <div>
          <input
            type="text"
            placeholder={`Type "${furnitureProductName}" to confirm deletion`}
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <button onClick={handleConfirmDelete}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DelFurnitureProductButton;
