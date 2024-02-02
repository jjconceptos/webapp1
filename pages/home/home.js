// pages/home.js
import React, { useState, useEffect } from 'react';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext'; // Adjust the path accordingly

const Home = () => {
  const { state } = useAuth();
  const words = ['J', 'J', 'ESTUDIO'];
  const establishedText = ['Est.', ' 20', '21'];
  const [visibleWords, setVisibleWords] = useState([]);
  const [visibleEstablishedText, setVisibleEstablishedText] = useState([]);
  const [currentIndexWords, setCurrentIndexWords] = useState(0);
  const [currentIndexEstablished, setCurrentIndexEstablished] = useState(0);

  console.log('Clearance Level:', state.clearanceLevel); // Add this log to check the clearance level

  useEffect(() => {
    const typeWords = () => {
      if (currentIndexWords < words.length) {
        const currentWord = words[currentIndexWords];

        if (currentWord !== undefined) {
          setVisibleWords((prevVisibleWords) => [...prevVisibleWords, currentWord]);
        }

        setCurrentIndexWords((prevIndex) => prevIndex + 1);
      }
    };

    const typeEstablishedText = () => {
      if (currentIndexEstablished < establishedText.length) {
        const currentChar = establishedText[currentIndexEstablished];

        if (currentChar !== undefined) {
          setVisibleEstablishedText((prevVisibleEstablishedText) => [...prevVisibleEstablishedText, currentChar]);
        }

        setCurrentIndexEstablished((prevIndex) => prevIndex + 1);
      }
    };

    const animationInterval = setInterval(() => {
      typeWords();
      if (currentIndexWords >= words.length) {
        typeEstablishedText();
      }
    }, 730); // Adjust the delay between words as needed (in milliseconds)

    // Clear the interval when all words and established text are displayed
    return () => clearInterval(animationInterval);
  }, [currentIndexWords, currentIndexEstablished, words, establishedText]);

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

        .type-in-container {
          
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 70vh; /* Center vertically within the viewport */
        }

        .type-in-text {
          position: fixed; /* Fixed position to stay in place */
          top: 50%; /* Adjust top position */
          left: 50%; /* Adjust left position */
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 6vw; /* Adjust the font size for mobile responsiveness */
          padding-left: 3vw; /* Adjust the padding for mobile responsiveness */
        }

        .established-text {
          position: fixed; /* Fixed position to stay in place */
          top: 60%; /* Adjust top position */
          left: 50%; /* Adjust left position */
          transform: translate(-50%, -50%);
          font-size: 3vw; /* Adjust the font size for mobile responsiveness */
          text-align: center; /* Center the text horizontally */
        }
      `}</style>

      {/* Content above the image */}
      <div className="type-in-container">
        <div className="type-in-text">
          <h1>{visibleWords.join(' ')}</h1>
        </div>
        {currentIndexWords >= words.length && (
          <p className="established-text">{visibleEstablishedText.join('')}</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
