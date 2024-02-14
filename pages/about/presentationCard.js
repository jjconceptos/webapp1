import React from 'react';
import Layout from '/layouts/layout';

const PresentationCard = () => {

  const handleConocenosClick = () => {
    // Specify the position you want to scroll to (adjust the value as needed)
    const scrollPosition = 680; // Replace with your desired position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth', // Use smooth scrolling
    });
  };

  return (
    <Layout>
      <style jsx>{`
       
        body {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            
            height: auto;
        }

        .presentation-card-container {

            width: 80%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            padding-top: 10vh;
          
                    
        }

        .main-title-section-container {
        position: absolute;
        margin-top: 40vh;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
        }
      
        
        .images-container {
            position: absolute;
            margin-top: 40vh;
            
            z-index: 1;
        }

        .small-image {
        position: absolute;
        top: 50vh; /* Adjust the top position as needed */
        width: 60vw;
        height: 35vh;
        display: flex;
        left: 50%;
        
        background-image: url('/jamie.jpg'); /* Update the path to point directly to the image */
        background-size: cover;
        z-index: 15;
        }

        
    
        .large-image {
            position: absolute;
            top: 100vh; /* Adjust the top position as needed */
            left: 50%;
            transform: translateX(50%);
            width: 60vw;
            height: 35vh;
            background-image: url('/cop.jpg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
            }
            
        
        .title {
            font-size: 4vw;
            text-align: center;
            color: #000;
            cursor: pointer;
            z-index: 2;
        }

        .sub-title {
            font-size: 3vw;
            text-align: center;
            color: #000;
            cursor: pointer;
            z-index: 2;
            }
    

          

          
          @media screen and (min-width: 800px) and (min-height: 600px) {
      
            body {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: auto;
              }
              

              .presentation-card-container {
                width: 80%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                padding-top: 10vh;
                
              }

              .main-title-section-container {
                position: absolute;
                margin-top: 40vh;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
              }
                
                  
              .images-container {
                position: relative;
                margin-top: 40vh;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                background-position: center;
                
                z-index: 1;
              }
          
                  .small-image {
                    position: absolute;
                    top: 148vh;
                    left: 5vh;
                    width: 40%;
                    height: 25%;
                    background-image: url('/jamie.jpg');
                    background-size: cover;
                    background-position: center;
                    
                    margin-bottom: 555px;
                    z-index: 1;
                  }
        
                  .large-image {
                    position: absolute;
                    top: 148vh;
                    left: 5vh;
                    width: 40%;
                    height: 25%;
                    background-image: url('/cop.jpg');
                    background-size: cover;
                    background-position: center;
                    
                    margin-bottom: 555px;
                    z-index: 1;
                  }
                  
                
                .title {
                  font-size: 3.3vw;
                  text-align: center;
                  color: #000;
                  cursor: pointer;
                  z-index: 2;
                }
        
                .sub-title {
                    font-size: 2.1vw;
                    text-align: center;
                    color: #000;
                    cursor: pointer;
                    z-index: 2;
                  }
                
      
          }
        
       
      `}</style>

<div className="presentation-card-container">
      <div className="main-title-section-container">
      <div className="title">
        JJ Estudio
      </div>

      <div className="sub-title" onClick={handleConocenosClick}>
        Mobiliario e interiores
      </div>
      </div>
      <div className="images-container">
      
      <div className="small-image"></div>
      <div className="large-image"></div>

      
      </div>
      

      
    </div>
    </Layout>
  );
};

export default PresentationCard;
