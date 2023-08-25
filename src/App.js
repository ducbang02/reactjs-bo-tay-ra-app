import React, {useEffect, useRef} from 'react';
import './App.css';
import { Howl } from 'howler';
// import mp3 from './assets/mp3.mp3';
// const mobilenet = require('@tensorflow-models/mobilenet');
// const knnClassifier = require('@tensorflow-models/knn-classifier');


// var sound = new Howl({
//   src: [mp3]
// });

// sound.play();

function App() {
  const video = useRef();

  const init = async () => {
    console.log("init...");
    await setupCamera();
    console.log("setup camera ok");
  }

  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          })
          .catch(error => reject(error));
      } else {
        reject(new Error('getUserMedia is not supported on this browser'));
      }
    });
  };
  // const setupCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     if (video.current) {
  //       video.current.srcObject = stream;
  //     }
  //   } catch (error) {
  //     console.error('Error accessing camera:', error);
  //   }
  // };

  useEffect(() => {
    init(); 

    //clear up

    return () => {

    }

  }, []);

  return (
    <div className="main">
      <video
      ref={video}
      className="video"
      autoPlay
      />  

      <div className="control">
        <button className="btn"> Train 1</button>
        <button className="btn"> Train 2</button>
        <button className="btn"> Run</button>

      </div>
    </div>
  );
}

export default App;
