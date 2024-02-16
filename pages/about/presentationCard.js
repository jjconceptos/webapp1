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

          .images-container-one {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 50vh;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
          }

          .images-container-two {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 100vh;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
          }

          .images-container-three {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 150vh;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
          }

          .images-container-four {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 200vh;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
          }

          .images-container-five {
            position: absolute;
            display: flex;
            justify-content: center;
            top: 250vh;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 1;
          }
          

          .small-image-one {
            width: 50vw;
            height: 35vh;
            background-image: url('/workDesk.jpeg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
          }

          .large-image-one {
            width: 50vw;
            height: 35vh;
            background-image: url('/coffeeTable.jpeg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
          }

          .small-image-two {
            width: 50vw;
            height: 35vh;
            background-image: url('/darkCloset.jpeg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
          }

          .large-image-two {
            width: 50vw;
            height: 35vh;
            background-image: url('/darkClosetTwo.jpeg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
          }
         
          .small-image-three {
            width: 50vw;
            height: 35vh;
            background-image: url('/closet.jpeg'); /* Update the path to point directly to the image */
            background-size: cover;
            z-index: 15;
          }

          .large-image-three {
            width: 50vw;
            height: 35vh;
            background-image: url('/elipticTable.jpeg'); /* Update the path to point directly to the image */
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

            .image-title-one {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                right: 8vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-one {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                right: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              .image-title-leftie-one {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-leftie-one {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              .image-title-two {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                right: 8vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-two {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                right: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              .image-title-leftie-two {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-leftie-two {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              .image-title-three {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                right: 8vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-three {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                right: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              .image-title-leftie-three {
                position: absolute;
                top: 0vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 4vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }
              
              .image-sub-title-leftie-three {
                position: absolute;
                top: 3vh; /* Adjust as needed */
                left: 5vw; /* Adjust as needed */
                font-size: 3vw;
                color: #000;
                cursor: pointer;
                z-index: 2;
              }

              @media screen and (min-width: 800px) and (min-height: 600px) {

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
        
                  .images-container-one {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    top: 150vh;
                    
                    right: 40vw;
                    margin: auto;
                    z-index: 1;
                  }
        
                  .images-container-two {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    top: 250vh;
                    left: 40vw;
                    
                    margin: auto;
                    z-index: 1;
                  }
        
                  .images-container-three {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    top: 350vh;
                    
                    right: 40vw;
                    margin: auto;
                    z-index: 1;
                  }
        
                  .images-container-four {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    top: 475vh;
                    left: 0;
                    right: 0;
                    margin: auto;
                    z-index: 1;
                  }
        
                  .images-container-five {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    top: 600vh;
                    left: 40vw;
                    
                    margin: auto;
                    z-index: 1;
                  }
                  
        
                  .small-image-one {
                    width: 50vw;
                    height: 115vh;
                    background-image: url('/workDesk.jpeg'); /* Update the path to point directly to the image */
                    background-size: cover;
                    z-index: 15;
                  }
        
                  .large-image-one {
                    width: 50vw;
                    height: 65vh;
                    background-image: url('/coffeeTable.jpeg'); /* Update the path to point directly to the image */
                    background-size: cover;
                    z-index: 15;
                  }
        
                  .small-image-two {
                    width: 50vw;
                    height: 105vh;
                    background-image: url('/darkCloset.jpeg'); /* Update the path to point directly to the image */
                    background-size: cover;
                    z-index: 15;
                  }
        
                  .large-image-two {
                    width: 50vw;
                    height: 105vh;
                    background-image: url('/darkClosetTwo.jpeg'); /* Update the path to point directly to the image */
                    background-size: cover;
                    z-index: 15;
                  }
                 
                  .small-image-three {
                    width: 50vw;
                    height: 105vh;
                    background-image: url('/closet.jpeg'); /* Update the path to point directly to the image */
                    background-size: cover;
                    z-index: 15;
                  }
        
                  .large-image-three {
                    width: 50vw;
                    height: 65vh;
                    background-image: url('/elipticTable.jpeg'); /* Update the path to point directly to the image */
                    background-size: cover;
                    z-index: 15;
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
        
                    .image-title-one {
                        position: absolute;
                        top: 0vh; /* Adjust as needed */
                        right: 8vw; /* Adjust as needed */
                        font-size: 4vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
                      
                      .image-sub-title-one {
                        position: absolute;
                        top: 8vh; /* Adjust as needed */
                        right: 5vw; /* Adjust as needed */
                        font-size: 3vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
        
                      .image-title-leftie-one {
                        position: absolute;
                        top: 0vh; /* Adjust as needed */
                        left: 72vw; /* Adjust as needed */
                        font-size: 4vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
                      
                      .image-sub-title-leftie-one {
                        position: absolute;
                        top: 8vh; /* Adjust as needed */
                        left: 72vw; /* Adjust as needed */
                        font-size: 3vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
        
                      .image-title-two {
                        position: absolute;
                        top: 0vh; /* Adjust as needed */
                        right: 83vw; /* Adjust as needed */
                        font-size: 4vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
                      
                      .image-sub-title-two {
                        position: absolute;
                        top: 8vh; /* Adjust as needed */
                        right: 80vw; /* Adjust as needed */
                        font-size: 3vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
        
                      .image-title-leftie-two {
                        position: absolute;
                        top: 5vh; /* Adjust as needed */
                        left: 58vw; /* Adjust as needed */
                        font-size: 4vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 8;
                      }
                      
                      .image-sub-title-leftie-two {
                        position: absolute;
                        top: 13vh; /* Adjust as needed */
                        left: 58vw; /* Adjust as needed */
                        font-size: 3vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 8;
                      }
        
                      .image-title-three {
                        position: absolute;
                        top: 0vh; /* Adjust as needed */
                        right: 8vw; /* Adjust as needed */
                        font-size: 4vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
                      
                      .image-sub-title-three {
                        position: absolute;
                        top: 8vh; /* Adjust as needed */
                        right: 5vw; /* Adjust as needed */
                        font-size: 3vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
        
                      .image-title-leftie-three {
                        position: absolute;
                        top: 0vh; /* Adjust as needed */
                        left: -25vw; /* Adjust as needed */
                        font-size: 4vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 2;
                      }
                      
                      .image-sub-title-leftie-three {
                        position: absolute;
                        top: 8vh; /* Adjust as needed */
                        left: -25vw; /* Adjust as needed */
                        font-size: 3vw;
                        color: #000;
                        cursor: pointer;
                        z-index: 5;
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
      <div className="image-title-one">Title</div>
      <div className="image-sub-title-one">Subtitle</div>
      <div className="small-image-one"></div>

      <div className="images-container-one">
      <div className="image-title-leftie-one">Title</div>
      <div className="image-sub-title-leftie-one">Subtitle</div>
      <div className="large-image-one"></div>
      </div>

      <div className="images-container-two">
      <div className="image-title-two">Title</div>
      <div className="image-sub-title-two">Subtitle</div>
      <div className="small-image-two"></div>
      </div>

      <div className="images-container-three">
      <div className="image-title-leftie-two">Title</div>
      <div className="image-sub-title-leftie-two">Subtitle</div>
      <div className="large-image-two"></div>
      </div>

      <div className="images-container-four">
      <div className="image-title-three">Title</div>
      <div className="image-sub-title-three">Subtitle</div>
      <div className="small-image-three"></div>
      </div>

      <div className="images-container-five">
      <div className="image-title-leftie-three">Title</div>
      <div className="image-sub-title-leftie-three">Subtitle</div>
      <div className="large-image-three"></div>
      </div>

      
    
      </div>
    </div>
    </Layout>
  );
};

export default PresentationCard;
