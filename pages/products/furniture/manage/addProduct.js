import React, { useState, useEffect } from 'react';

const FurnitureProductForm = ({ onSubmit, onFurnitureProductAdded, furnitureProducts, onCloseForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Update the 'photo' state when 'photos' array changes
    if (photos.length > 0) {
      setPhoto(photos[0]);
    }
  }, [photos]);

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
    const files = e.target.files;
    const newPhotos = Array.from(files);
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (name === '' || description === '' || photos.length === 0) {
      console.error('All fields are required');
      return;
    }

    // Log the length of the images array before submission
    console.log('Length of images array:', photos.length);
  
    //console.log('Selected photos:', photos);
    console.log('Form data before submission:', {
      name,
      description,
      price,
      photos,
    });
  
    const timestamp = Date.now().toString().slice(2, 11);
    const nameWithTimestamp = `${name}-${timestamp}`;
  
    const formData = new FormData();
    formData.append('name', nameWithTimestamp); 
    formData.append('description', description);
    formData.append('price', price);
  
    // Append each selected photo to the FormData object
    photos.forEach((photo) => {
      //console.log(`Appending photo ${index + 1}:`, photo);
      

      formData.append(`photos`, photo);
    });

    console.log('formData:', formData);
  
    try {
      // Send the form data to the local image upload endpoint
      const imageResponse = await fetch('/api/products/furniture/productImage', {
        method: 'POST',
        body: formData,
        headers: {
          'image-name': nameWithTimestamp,
        },
      });
  
      if (imageResponse.ok) {
        // productimage data submission successful
        console.log('Image data submitted successfully');
  
        // Now, send the text data
        const textData = {
          name: nameWithTimestamp,
          description,
          price,
          timestamp,
          images: `${name}-${timestamp}`, // Include the formatted image name
        };

        console.log('Text data: ', textData);
  
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
  
         
         // Send the product name to the API immediately after adding it
        const furnitureProductNamesResponse = await fetch('/api/products/furniture/productNames', {
          method: 'POST',
          body: JSON.stringify({ furnitureProductNames: [nameWithTimestamp] }), // Send name with timestamp
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
          width: 70%; /* Change this value to your desired width */
          height: 30%;
          overflow-y: auto; /* Add vertical scroll if needed */
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

        .add-more-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 0.25vw;
          padding: 0.5vw;
          cursor: pointer;
          margin-top: 1vw;
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
          <input id="file-input" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} multiple />
          {photos.length === 0 &&
            <label htmlFor="file-input" className="add-more-button">Choose File</label>
          }
          {photos.length > 0 &&
            <button type="button" className="add-more-button" onClick={() => document.getElementById("file-input").click()}>+ Add More Images</button>
          }
        </div>
        <div className="selected-photos">
          {photos.map((photo, index) => (
            <div key={index}>{photo.name}</div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
);
};

export default FurnitureProductForm;
