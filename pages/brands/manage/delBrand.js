import React, { useState } from 'react';

const DelBrandButton = ({ brandName, onDeleteBrand }) => {
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the brand "${brandName}"?`)) {
      setShowDeleteInput(true); // Show the delete input when the delete button is clicked
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteInput === brandName) {
        // Send a request to delete the brand text data
        const responseText = await fetch('/api/brands/delText', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brandName,
          }),
        });
  
        // Send a request to delete the brand name
        const responseNames = await fetch('/api/brands/delBrandNames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brandName,
          }),
        });
  
        // Send a request to delete the brand image
        const responseImage = await fetch('/api/brands/delImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brandName,
          }),
        });
        console.log(responseText);
        console.log(responseNames);
        console.log(responseImage);
  
        if (responseText.ok && responseNames.ok && responseImage.ok) {
          // Update the state to remove the deleted brand
          onDeleteBrand(brandName);
  
          // Clear the delete input and hide it
          setDeleteInput('');
          setShowDeleteInput(false);
        } else {
          console.error('Brand deletion failed');
        }
      } else {
        console.error('Confirmation text does not match brand name');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <button onClick={handleDelete}>Delete Brand</button>
      {showDeleteInput && (
        <div>
          <input
            type="text"
            placeholder={`Type "${brandName}" to confirm deletion`}
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <button onClick={handleConfirmDelete}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DelBrandButton;
