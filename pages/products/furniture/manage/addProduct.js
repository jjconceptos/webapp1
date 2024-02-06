import React, { useState } from 'react';


const FurnitureProductForm = ({ onSubmit, onFurnitureProductAdded, furnitureProducts, onCloseForm}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
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
    formData.append('price', price);
    formData.append('photo', photo);

    try {
      // Send the form data to the local image upload endpoint
      const imageResponse = await fetch('/api/products/furniture/productImage', {
        method: 'POST',
        body: formData,
        headers: {
          // Include the product name in the image headers
          'image-name': name,
          'timestamp': timestamp,
        },
      });

      if (imageResponse.ok) {
        // productimage data submission successful
        console.log('Image data submitted successfully');

        // Now, send the text data
        const textData = {
          name,
          description,
          price,
          timestamp,
        };

        const textResponse = await fetch('/api/products/furniture/productText', {
          method: 'POST',
          body: JSON.stringify({ textData }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (textResponse.ok) {
          // Text data submission successful
          console.log('Text data submitted successfully');

          // Send the productname to the API immediately after adding it
          const furnitureProductNamesResponse = await fetch('/api/products/furniture/productNames', {
            method: 'POST',
            body: JSON.stringify({ furnitureProductNames: [name] }), // Send just the product name as an array
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (furnitureProductNamesResponse.ok) {
            console.log('Product name added to the list successfully');
          } else {
            console.error('Failed to add the product name to the list');
          }

          // Notify the parent component that a new product has been added
          onFurnitureProductAdded(name);

          // Clear form fields
          setName('');
          setDescription('');
          setPhoto(null);
        } else {
          // Text data submission failed
          console.error('Text data submission failed');
        }
      } else {
        // product image data submission failed
        console.error('Image data submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div>
      <style jsx>{`

        .form-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #C18B8C;
          padding: 2vw;
          border: 0.2vw solid #ccc;
          border-radius: 0.5vw;
          box-shadow: 0 0.2vw 0.5vw rgba(0, 0, 0, 0.1);
          z-index: 1000; /* Ensure the form is above other content */
        }

        .input-field-add-product {
          width: 50%;
          padding: 0.5vw;
          border: 0.2vw solid #ccc;
          border-radius: 0.25vw;
          outline: none;
          transition: border-color 0.3s;
          margin: 0 auto;
        }

        .input-field-add-product:focus {
          border-color: #007bff;
        }

        .close-button {
          position: absolute;
          top: 1vw;
          right: 1vw;
          background: none;
          border: none;
          font-size: 2vw;
          cursor: pointer;
          color: #333;
          outline: none;
          transition: color 0.3s ease;
        }
  
        .close-button:hover {
          color: #555;
        }

      `}</style>
    <div className="form-container">
    <button className="close-button" onClick={onCloseForm}>X</button>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <input className="input-field-add-product" type="text" value={name} onChange={handleNameChange} placeholder="Name" />
        </div>
        <div>
          <textarea className="input-field-add-product" value={description} onChange={handleDescriptionChange} placeholder="Description" />
        </div>
        <div>
          <input className="input-field-add-product" type="text" value={price} onChange={handlePriceChange} placeholder="Price" />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default FurnitureProductForm;
