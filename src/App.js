import { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageUrlInput from './components/imageurlinput/ImageUrlInput';
import Rank from './components/rank/Rank';
import ParticlesComponent from './components/particles/ParticlesComponent';
import FaceRecognition from './components/prediction/FaceRecognition';


const USER_ID = 'sabmus';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '';
const APP_ID = 'face-recognition';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
// onst IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ""
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    console.log(this.state.imageUrl);

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": this.state.input
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result.outputs[0].data.regions))
        .catch(error => console.log('error', error));
  }
 
  render () {
    return (
      <div className="App">
        <ParticlesComponent id="tsparticles" />
        <Navigation />
        <Logo />
        <Rank />
        <ImageUrlInput 
          onInputChange={ this.onInputChange } 
          onButtonSubmit={ this.onButtonSubmit }
        />
        <FaceRecognition image_url={ this.state.imageUrl }/>
      </div>
    );
  }
  
}

export default App;
