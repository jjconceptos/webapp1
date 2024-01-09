import React, { useState, useEffect, useRef } from 'react';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext';
import 'layouts/grid.css';
import 'layouts/carousel.css';

const Home = () => {
  const { state } = useAuth();
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([
    'En donde esta tu espacio?',
    'Cual es el área de tu espacio?',
    'Cuantos cuartos?',
    'Cuanta gente recurre este espacio?',
    'Que tono te gusta mas?',
    'Que material te gusta mas?',
    'De estos estilos, cual te gusta mas?',
    'Que iluminacion te gusta mas?',
    'Bar?',
    'Oficina?',
    'Plantas y paisajismo, te interesan?',
    'Nos ayudas mucho si tienes el nivel de piso, pero si no pasanos el contacto de tu administrador del espacio',
    'Para hacer el proyecto perfecto para ti, por favor dinos que presupuesto tienes en mente',
    'Por ultimo pasanos tu contacto',
    
    
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    location: { address: '', street: '', zipCode: '' },
    size: '',
    rooms: '',
    people: '',
    preferredTone: '',
    preferredMaterial: '',
    preferredStyle: '',
    preferredLighting: '',
    bar: '',
    office: '',
    plants: '',
    blueprints: '',
    budget: '',
    contact: { name: '', lastName: '', email: '', cellphone: '' },
  });
  const [showQuestions, setShowQuestions] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = async (event) => {
    event.preventDefault();  // Prevent the default form behavior
  
 // Check if the button clicked is "Atrás" or "Siguiente"
 const buttonType = event.target.textContent.trim().toLowerCase();

 if (buttonType === 'atrás') {
   // Handle going back to the previous question
   handleBack();
 } else {

    // Move to the next question if it exists
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Send the form data to the serverless function when "Submit" is clicked
      try {
        const response = await fetch('/api/mails/submitForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          console.log('Form data sent successfully:', formData);
          setFormSubmitted(true);
  
          // Set showQuestions to true after submitting the form
          setShowQuestions(true);
        } else {
          console.error('Failed to send form data:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    }
    }
  };
  

  const handleChange = (e) => {
    // Update form data on input change
    const { name, value } = e.target;

    if (name.includes('location.')) {
      // Update location subfields
      const locationField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        location: { ...prevData.location, [locationField]: value },
      }));
    } else if (name.includes('contact.')) {
      // Update contact subfields
      const contactField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        contact: { ...prevData.contact, [contactField]: value },
      }));
    } else {
      // Update other fields
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleBack = () => {
    // Move to the previous question if it exists
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  console.log('Clearance Level:', state.clearanceLevel);

  useEffect(() => {
    // Scroll to the form section when showQuestions becomes true
    if (formRef.current && showQuestions) {
      const formPosition = formRef.current.offsetTop;
      const formHeight = formRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
  
      const scrollDistance = formPosition - windowHeight + formHeight + 100; // Adjust 20 for extra space
      
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth',
      });
    }
  }, [showQuestions]);

  const startQuestions = () => {
    console.log('Starting questions...');
    setShowQuestions(true);
  
    // Scroll down to the form section when starting questions
    setTimeout(() => {
      if (formRef.current) {
        const formPosition = formRef.current.offsetTop;
        const formHeight = formRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const scrollDistance = formPosition - windowHeight + formHeight + 10; // Adjust 20 for extra space
        
        window.scrollBy({
          top: scrollDistance,
          behavior: 'smooth',
        });
      }
    }, 1);
  };

  const yourGridItems1 = [
    {
      backgroundColor: '#F4F6F6', // Replace with your desired color code
      text: '1',
    },
    {
      backgroundColor: '#FFF3E0', // Replace with your desired color code
      text: '2',
    },
    {
      backgroundColor: '#FFE0B2', // Replace with your desired color code
      text: '3',
    },
    {
      backgroundColor: '#F8C471', // Replace with your desired color code
      text: '4',
    },
    {
      backgroundColor: '#F9E79F ', // Replace with your desired color code
      text: '5',
    },
    {
      backgroundColor: '#FCF3CF', // Replace with your desired color code
      text: '6',
    },
    {
      backgroundColor: '#F4F6F7', // Replace with your desired color code
      text: '7',
    },
    {
      backgroundColor: '#D7CCC8', // Replace with your desired color code
      text: '8',
    },
    {
      backgroundColor: '#aabbcc', // Replace with your desired color code
      text: '9',
    },
  ];

  const yourGridItems2 = [
    {
      imagePath: '/teak.jpeg',
      text: '1',
    },
    {
      imagePath: '/parota.jpeg',
      text: '2',
    },
    {
      imagePath: '/ipe.jpeg',
      text: '3',
    },
    {
        imagePath: '/tzalam.jpeg',
        text: '4',
      },
      {
        imagePath: '/cumaru.jpeg',
        text: '5',
      },
      {
        imagePath: '/mahogany.jpeg',
        text: '6',
      },
      
    
  ];

  const yourCarouselItems1 = [
    {
        imagePath: '/hamptons.jpeg',
        text: '1',
      },
      {
        imagePath: '/cannes1.jpeg',
        text: '2',
      },
      {
        imagePath: '/ibiza.jpeg',
        text: '3',
      },
  ];

  const yourCarouselItems2 = [
    {
      imagePath: '/ilum1.jpeg',
      text: '1',
    },
    {
      imagePath: '/ilum2.jpeg',
      text: '2',
    },
    {
      imagePath: '/ilum3.jpeg',
      text: '3',
    },
    {
        imagePath: '/ilum4.jpeg',
        text: '4',
      },
      {
        imagePath: '/ilum5.jpeg',
        text: '5',
      },
    // Add more items as needed
  ];


  const Grid = ({ items }) => {
    return (
      <div className="grid-container">
        <div className="color-grid">
          {items.map((item, index) => (
            <div
              key={index}
              className="color-grid-item"
              style={{ backgroundColor: item.backgroundColor }}
            >
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ImageGrid = ({ items }) => {
    return (
      <div className="image-container">
          <div className="image-grid">
        {items.map((item, index) => (
          <div key={index} className="image-grid-item">
            <img src={item.imagePath} alt={`Image ${index + 1}`} />
            <p>{item.text}</p>
          </div>
          
        ))}
        </div>
      </div>
    );
  };

  const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
    };
  
    return (
      <div className="carousel">
        <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.imagePath} alt={`Image ${index + 1}`} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        <button type="button" onClick={handlePrev} className="carousel-button prev">
  &lt;
</button>
<button type="button" onClick={handleNext} className="carousel-button next">
  &gt;
</button>
      </div>
    );
  };

  return (
    <Layout>
      <style jsx global>{`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 55vh; /* Adjust the min-height as needed */
  }


  
  .background-container {
    position: absolute;
    top: 25px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    margin: 0cm;
    background-image: url('schematic.jpeg');
    background-size: cover;
    background-position: center;
    z-index: 0;
    padding-bottom: 120px; /* Add padding-bottom to create space for the form */
  }

  .header {
    position: absolute;
    top: 5px; /* Adjust the top value as needed */
    right: 10px; /* Adjust the right value as needed */
    font-family: 'Your Custom Font', sans-serif;
    font-size: 12px; 
    justify-content: space-between;
    color: #fff; 
    
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 75vh; /* Change to auto */
    padding: 50vh;
  }

  label {
    margin: 10px 0;
    font-weight: bold;
    width: 300px;
  }

  input {
    padding: 8px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
      
    margin-top: 10px;
    margin-bottom: 5px;
    z-index: 1;
  }

  .non-question-section {
    text-align: center;
    margin-top: 350px;
    padding: 20vh;
  }

  .explanatory-text {
    position: absolute;
    top: 25vh;  // Adjust the value as needed to position it at the desired height
    width: 100%;
    text-align: center;
    z-index: 2; // Ensure it appears above other elements
  }

  .image-text-section {
    position: absolute;
    top: 257vh;
    left: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px;
  }

  .image-text-item {
    text-align: center;
  }

  .image-text-item img {
    width: 100px; /* Adjust image width as needed */
    height: 100px; /* Adjust image height as needed */
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .question-wrapper {
    margin-top: 10px; 
  }

  
  .button-container {
    display: flex;
     /* Adjust the margin as needed */
  }

  
  .form-button.back {
    margin-right: 10px; /* Add margin to separate the buttons */
  }

  /* Add any additional styling for your buttons */
  .form-button {
    /* Your existing button styles */
    margin-top: 10px;
    margin-bottom: 5px;
    z-index: 1;
  }
  
`}</style>


<div className="explanatory-text">
        <p>
          textotextotexto.
        </p>
        <p>
          textotextomastexto.
        </p>
      </div>
      <div className="header">
    <a href="#contacto">Contacto</a>
    <span> | </span>
    <a href="#sitio-de-compradores">Sitio de compradores</a>
    <span> | </span>
    <a href="#solicitar-informacion">Solicitar información</a>
  </div>

      <div className="background-container">
        <div className="non-question-section">
          {!showQuestions && !formSubmitted && (
            <>
            
              <p style={{ textAlign: 'center' }}>
                Por favor ayudanos a contestar unas preguntas para entender mejor lo que necesitas
              </p>
              <button onClick={startQuestions}>Comenzar</button>
            </>
          )}

          {!formSubmitted && showQuestions && currentQuestion < questions.length && (
            <>
              <form className="form" ref={formRef}>
                <p>{questions[currentQuestion]}</p>

                {currentQuestion === 0 && (
                  <>
                    <label>
                      Dirección:
                      <input
                        type="text"
                        name="location.address"
                        value={formData.location.address}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Delegación:
                      <input
                        type="text"
                        name="location.street"
                        value={formData.location.street}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Código postal:
                      <input
                        type="text"
                        name="location.zipCode"
                        value={formData.location.zipCode}
                        onChange={handleChange}
                      />
                    </label>
                  </>
                )}
                {currentQuestion === 1 && (
                  <label>
                    Tamaño m2:
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 2 && (
                  <label>
                    Numero de cuartos:
                    <input
                      type="text"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 3 && (
                  <label>
                    Numero de recurrentes:
                    <input
                      type="text"
                      name="people"
                      value={formData.people}
                      onChange={handleChange}
                    />
                  </label>
                )}

                {currentQuestion === 4 && (
                  
                  <label>
                  
                      Escribe el numero de muestra que te gusta:
                      <input
                      type="text"
                      name="preferredTone"
                      value={formData.preferredTone}
                      onChange={handleChange}
                      />
                      <Grid items={yourGridItems1} />
                  </label>
                  )}
                  
                  {currentQuestion === 5 && (
                    <label>
                      Escribe el numero de muestra que te gusta:
                      <input
                        type="text"
                        name="preferredMaterial"
                        value={formData.preferredMaterial}
                        onChange={handleChange}
                      />
                      <ImageGrid items={yourGridItems2} />
                      
                    </label>
                    
                  )}
                  {currentQuestion === 6 && (
                    <label>
                      Escribe el numero de muestra que te gusta:
                      
                      <input
                        type="text"
                        name="preferredStyle"
                        value={formData.preferredStyle}
                        onChange={handleChange}
                      />
                      <Carousel items={yourCarouselItems1} />
                      
                    </label>
                  )}
                  
                  {currentQuestion === 7 && (
                    <label>
                      Escribe el numero de muestra que te gusta:
                      <input
                        type="text"
                        name="preferredLighting"
                        value={formData.preferredLighting}
                        onChange={handleChange}
                      />
                      <Carousel items={yourCarouselItems2} />
                    </label>
                  )}
                
                {currentQuestion === 8 && (
                  <label>
                    Si/No:
                    <input
                      type="text"
                      name="bar"
                      value={formData.bar}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 9 && (
                  <label>
                    Si/No:
                    <input
                      type="text"
                      name="office"
                      value={formData.office}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 10 && (
                  <label>
                    Escribe un numero del 1 al 10:
                    <input
                      type="text"
                      name="plants"
                      value={formData.plants}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 11 && (
                  <label>
                    Escribe el mail de tu administracion:
                    <input
                      type="text"
                      name="blueprints"
                      value={formData.blueprints}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 12 && (
                  <label>
                    Presupuesto en MXN$:
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 13 && (
                  <>
                    <label>
                      Nombre:
                      <input
                        type="text"
                        name="contact.name"
                        value={formData.contact.name}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Apellidos:
                      <input
                        type="text"
                        name="contact.lastName"
                        value={formData.contact.lastName}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="contact.email"
                        value={formData.contact.email}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Celular:
                      <input
                        type="tel"
                        name="contact.cellphone"
                        value={formData.contact.cellphone}
                        onChange={handleChange}
                      />
                    </label>
                  </>
                )}
               <div className="button-container">
            <button type="button" onClick={handleBack} className="form-button back">
                Atrás
            </button>
            <button onClick={handleAnswer} className="form-button">
                {isLastQuestion ? 'Enviar' : 'Siguiente'}
            </button>
            </div>

              </form>
            </>
          )}

          {formSubmitted && (
            <p style={{ textAlign: 'center', marginTop: '900px', padding: '50vh'}}>
              ¡Gracias por enviar la información! Nos pondremos en contacto contigo pronto.
            </p>
          )}  


        </div>

       
      </div>
    </Layout>
  );
};

export default Home;