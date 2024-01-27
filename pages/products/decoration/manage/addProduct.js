import React, { useState } from 'react';
import Layout from '/layouts/layout';


const DecorationProductForm = ({ onSubmit, onDecorationProductAdded, decorationProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const timestamp = Date.now();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate fields if needed
    if (name === '' || description === '' || !photo) {
      console.error('All fields are required');
      return;
    }
    console.log('Photo file:', photo); // Log the photo file being sent
  
    // Create a FormData object to send the form data as a multipart request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('photo', photo);
  
    try {
      // Send the form data to the local image upload endpoint
      const imageResponse = await fetch('/api/products/decoration/productImage', {
        method: 'POST',
        body: formData,
        headers: {
          // Include the project name in the image headers
          'image-name': name,
          'timestamp': timestamp,
        },
      });
  
      if (imageResponse.ok) {
        // Project image data submission successful
        console.log('Image data submitted successfully');
  
        // Now, send the text data
        const textData = {
          name,
          description,
          timestamp,
        };
  
        const textResponse = await fetch('/api/products/decoration/productText', {
          method: 'POST',
          body: JSON.stringify({ textData }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (textResponse.ok) {
          // Text data submission successful
          console.log('Text data submitted successfully');
  
          // Send the project name to the API immediately after adding it
          const decorationProductNamesResponse = await fetch('/api/products/decoration/productNames', {
            method: 'POST',
            body: JSON.stringify({ decorationProductNames: [name] }), // Send just the project name as an array
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (decorationProductNamesResponse.ok) {
            console.log('Project name added to the list successfully');
          } else {
            console.error('Failed to add the project name to the list');
          }
  
          // Notify the parent component that a new project has been added
          onDecorationProductAdded(name);
  
          // Clear form fields
          setName('');
          setDescription('');
          setPhoto(null);
        } else {
          // Text data submission failed
          console.error('Text data submission failed');
        }
      } else {
        // Project image data submission failed
        console.error('Image data submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <Layout>
<style jsx global>{`
 .input-container-add-product {
  position: absolute;
  top: 30%;
  left: 20%;
  transform: translate(-50%, -50%);
  /*background-image: url('/concrete.jpg');*/  
  background-color: #f3f0e9;
}

/* Define a CSS class for input fields */
.input-field-add-product {
  width: 50%;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s;
  margin: 0 auto;
}

/* Add a focus style */
.input-field-add-product:focus {
  border-color: #007bff;
}

`}</style>
     <div className="input-container-add-product">
  <div>
    <h2></h2>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <input className="input-field-add-product" type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      </div>
      <div>
        <textarea className="input-field-add-product" value={description} onChange={handleDescriptionChange} placeholder="Description" />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={handlePhotoChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</div>
      
    </Layout>
  );
};

export default DecorationProductForm;