import React, { useState } from 'react';

const DelFurnitureProductButton = ({ furnitureProductName, onDeleteFurnitureProduct }) => {
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  // Check if furnitureProductName is defined before attempting to split it
  const matches = furnitureProductName ? furnitureProductName.match(/^(.+?)-(\d+)$/) : null;
  const name = matches ? matches[1] : '';
  const imagesLength = matches ? matches[2] : '';

  console.log("Name:", name);
  console.log("Images Length:", imagesLength);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the project "${name}"?`)) {
      setShowDeleteInput(true); // Show the delete input when the delete button is clicked
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteInput === name) {
        // Send a request to delete the project text data
        const responseText = await fetch('/api/products/furniture/delText', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProductName: name, // Use the name for deletion
          }),
        });
  
        // Send a request to delete the project name
        const responseNames = await fetch('/api/products/furniture/delProductNames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            furnitureProductName: name, // Use the name for deletion
          }),
        });
  
        // Send a request to delete the project images
        const deleteImageRequests = Array.from({ length: parseInt(imagesLength, 10) }, (_, index) => {
          const imageUrl = `${name}-${index + 1}.jpg`; // Generate the image filename
          return fetch('/api/products/furniture/delImage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageUrl,
            }),
          });
        });
        
        const responseImages = await Promise.all(deleteImageRequests);
        
        console.log(responseText);
        console.log(responseNames);
        console.log(responseImages);
  
        if (responseText.ok && responseNames.ok && responseImages.every(response => response.ok)) {
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
            placeholder={`Type "${name}" to confirm deletion`}
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

