import React, { useState } from 'react';

const FurnitureProductForm = ({ onSubmit, onFurnitureProductAdded, furnitureProducts, onCloseForm }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);

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
    const newPhotos = Array.from(e.target.files);
    if (photos.length + newPhotos.length <= 3) {
      setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    } else {
      console.log('Cannot select more than 3 photos');
      // Optionally, you can provide feedback to the user that they cannot select more than 5 photos
    }
  };

  const timestamp = Date.now();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate fields if needed
    if (name === '' || description === '' || photos.length === 0) {
      console.error('All fields are required');
      return;
    }
    console.log('Photo files:', photos); // Log the photo files being sent

    // Create a FormData object to send the form data as a multipart request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });

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
        // product image data submission successful
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

          // Send the product name to the API immediately after adding it
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
          setPhotos([]);
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

        .selected-photos {
          margin-top: 1vw;
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
            <input id="file-input" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
            {photos.length === 0 &&
              <label htmlFor="file-input" className="add-more-button">Choose File</label>
            }
            {photos.length > 0 &&
              <button type="button" className="add-more-button" onClick={() => document.getElementById("file-input").click()}>+ Add More Files</button>
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
