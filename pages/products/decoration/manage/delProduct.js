import React, { useState } from 'react';

const DelProductButton = ({ decorationProductName, onDeleteDecorationProduct }) => {
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the project "${decorationProductName}"?`)) {
      setShowDeleteInput(true); // Show the delete input when the delete button is clicked
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteInput === decorationProductName) {
        // Send a request to delete the project text data
        const responseText = await fetch('/api/products/decoration/delText', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            decorationProductName,
          }),
        });
  
        // Send a request to delete the project name
        const responseNames = await fetch('/api/products/decoration/delProductNames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            decorationProductName,
          }),
        });
  
        // Send a request to delete the project image
        const responseImage = await fetch('/api/products/decoration/delImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            decorationProductName,
          }),
        });
        console.log(responseText);
        console.log(responseNames);
        console.log(responseImage);
  
        if (responseText.ok && responseNames.ok && responseImage.ok) {
          // Update the state to remove the deleted project
          onDeleteDecorationProduct(decorationProductName);
  
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
            placeholder={`Type "${decorationProductName}" to confirm deletion`}
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <button onClick={handleConfirmDelete}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DelProductButton;
