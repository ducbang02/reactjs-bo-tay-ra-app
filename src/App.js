import React, {useEffect, useRef} from 'react';
import './App.css';
import { Howl } from 'howler';
// import mp3 from './assets/mp3.mp3';
import '@tensorflow/tfjs-backend-webgl';

const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');


// var sound = new Howl({
//   src: [mp3]
// });

// sound.play();

const not_touch_label = 'not-touch';
const touched_label = 'touched';
const train_time = 50;

function App() {
  const video = useRef();
  const classifier = useRef();
  const mobilenetModule = useRef();

  const init = async () => {
    console.log("init...");
    await setupCamera();
    console.log("setup camera ok");

    classifier.current = knnClassifier.create();

    mobilenetModule.current = await mobilenet.load();

    console.log("done");
    console.log("khong cham tay vao mat va bam train 1");
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

  const train = async label => {
    for(let i = 0; i < train_time; i++){
      console.log(`Progress ${parseInt((i+1) / train_time * 100)}%`);

      await sleep(100);
    }
  }

  const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve,ms));
  }

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
        <button className="btn" onClick={() => train(not_touch_label)}> Train 1</button>
        <button className="btn" onClick={() => train(touched_label)}> Train 2</button>
        <button className="btn" onClick={() => {}}> Run</button>

      </div>
    </div>
  );
}

export default App;
