// pages/home.js
import React, { useState, useEffect } from 'react';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext'; // Adjust the path accordingly

const Home = () => {
  const { state } = useAuth();
  const words = ['J', 'J', 'ESTUDIO']; // Add your words here
  const [visibleWords, setVisibleWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('Clearance Level:', state.clearanceLevel); // Add this log to check the clearance level

  useEffect(() => {
    const typeWords = () => {
      if (currentIndex < words.length) {
        const currentWord = words[currentIndex];

        if (currentWord !== undefined) {
          setVisibleWords((prevVisibleWords) => [...prevVisibleWords, currentWord]);
        }

        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    };

    const animationInterval = setInterval(typeWords, 830); // Adjust the delay between words as needed (in milliseconds)

    // Clear the interval when all words are displayed
    return () => clearInterval(animationInterval);
  }, [currentIndex, words]);

  return (
    <Layout>
      {/* Add the background image styling */}
      <style jsx global>{`
        body {
          background-image: url('');
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-position: center;
          margin: 0;
          padding: 0;
          font-family: '', ; /* Add your preferred font-family */
        }

        .type-in-text {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 70vh; /* Center vertically within the viewport */
       
          padding-left: 16vh;
        }

        .type-in-text h1 {
          text-align: center; /* Center the text */
          color: #141111; /* Text color */
          font-size: 32px;
          white-space: nowrap; /* Prevent wrapping to the next line */
        }

         @media only screen and (max-width: 600px) {
          ul {
           
            display: flex;
            
            flex-wrap: wrap; /* Ensure flex items wrap on smaller screens */
            align-items: center;
            margin: 0;
            padding: 0;
            position: static;
            margin-top: 10px;
            margin-left: 5px;
            z-index: 2; // Ensure it appears above other elements
            font-size: 12px;
          }
        
          ul li {
            margin: 5px; /* Adjusted margin for more compact spacing */
          }
        
          footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 8vh;
            background-color: rgba(52, 73, 94);
            padding: 10px;
            color: black;
            font-size: 1vw; /* Adjusted for responsiveness */
            opacity: 0.8;
            z-index: 2;
            display: flex;
            flex-direction: row; /* Arrange items in a row */
            align-items: center; /* Align items vertically in the middle */
            justify-content: space-between; /* Add space between items */
          }
        
          .footer-section {
            font-size: 1.5vw; /* Adjusted for responsiveness */
            margin-right: 20px; /* Add some space between sections */
            display: flex;
            flex-direction: column; /* Arrange items in a column inside each section */
          }
        
          .footer-copyright {
            font-size: 2vw; /* Adjusted for responsiveness */
            margin-top: 2%;
            margin-right: 1%;
          }
        }

        @media only screen and (max-width: 600px) {
          .type-in-text {
            position: fixed; /* Fix the position */
            width: 100%; /* Take the full width of the viewport */
            top: 50%; /* Center vertically at 50% from the top */
            transform: translateY(-50%); /* Adjust for vertical centering */
            text-align: center; /* Center the text horizontally within the container */
          }
        
          .type-in-text h1 {
            font-size: 28px;
            white-space: nowrap;
            position: relative; /* Change position to relative */
            left: 0%; /* Move the text 50% to the right */
            transform: translateX(-50%); /* Adjust for horizontal centering */
          }
        
        }

/* Media query for screens between 769px and 1024px */
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  ul {
    /* Add specific styles for this screen size */
  }

  footer {
    /* Add specific styles for this screen size */
  }
}
      `}</style>

      {/* Content above the image */}
      <div className="type-in-text">
        <h1>{visibleWords.join(' ')}</h1>
      </div>
    </Layout>
  );
};

export default Home;
