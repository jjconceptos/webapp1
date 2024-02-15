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
            display: flex;
            justify-content: center;
            top: 100vh;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
            
          }
          
          .small-image {
            width: 50vw;
            height: 35vh;
            background-image: url('/jamie.jpg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
          }

          .large-image {
            width: 80vw;
            height: 35vh;
            background-image: url('/jamie.jpg'); /* Update the path to point directly to the image */
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

            .image-title {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                right: 8vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                right: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              .image-title-leftie {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                left: 8vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-leftie {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
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
      <div className="image-title">Title</div>
      <div className="image-sub-title">Subtitle</div>
      <div className="small-image"></div>

      <div className="images-container" style={{ marginTop: "-40vh" }}>
      <div className="image-title-leftie">Title</div>
      <div className="image-sub-title-leftie">Subtitle</div>
      <div className="large-image"></div>
      </div>
      
      <div className="images-container" style={{ marginTop: "20vh" }}>
      <div className="image-title">Title</div>
      <div className="image-sub-title">Subtitle</div>
      <div className="small-image"></div>
      </div>

      <div className="images-container" style={{ marginTop: "80vh" }}>
      <div className="image-title-leftie">Title</div>
      <div className="image-sub-title-leftie">Subtitle</div>
      <div className="small-image"></div>
      </div>

      <div className="images-container" style={{ marginTop: "140vh" }}>
      <div className="image-title">Title</div>
      <div className="image-sub-title">Subtitle</div>
      <div className="small-image"></div>
      </div>

      <div className="images-container" style={{ marginTop: "80vh" }}>
      <div className="image-title-leftie">Title</div>
      <div className="image-sub-title-leftie">Subtitle</div>
      <div className="small-image"></div>
      </div>

      
      

    
      </div>
    </div>
    </Layout>
  );
};

export default PresentationCard;
