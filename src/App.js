
import './App.css';
import { Howl } from 'howler';
// import mp3 from './assets/mp3.mp3';
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');


// var sound = new Howl({
//   src: [mp3]
// });

// sound.play();

function App() {
  return (
    <div className="main">
      <video
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
