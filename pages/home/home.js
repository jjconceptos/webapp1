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
      `}</style>

      {/* Content above the image */}
      <div className="type-in-text">
        <h1>{visibleWords.join(' ')}</h1>
      </div>
    </Layout>
  );
};

export default Home;
