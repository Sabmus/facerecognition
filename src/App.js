import { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageUrlInput from './components/imageurlinput/ImageUrlInput';
import Rank from './components/rank/Rank';
import ParticlesComponent from './components/particles/ParticlesComponent';
import FaceRecognition from './components/prediction/FaceRecognition';
import SignIn from './components/SignIn/SignIn';


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
      imageUrl: "",
      box: {},
      route: "signedOut"
    }
  }

  boxFace = (results) => {
    const regions = results.outputs[0].data.regions[0];
    console.log(regions);
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: width * regions.region_info.bounding_box.left_col,
      topRow: height * regions.region_info.bounding_box.top_row,
      rightCol: width - (width * regions.region_info.bounding_box.right_col),
      bottomRow: height - (height * regions.region_info.bounding_box.bottom_row),
      predictionValue: "value: " + regions.value
    }
  }

  displayBoxFace = (calculatedBox) => {
    console.log(calculatedBox);
    this.setState({ box: calculatedBox });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
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
        .then(result => this.displayBoxFace(this.boxFace(result)))
        .catch(error => console.log('error', error));
  }
 
  onRouteChange = (newRoute) => {
    this.setState({ route: newRoute });
  }

  render () {
    return (
      <div className="App">
        <ParticlesComponent id="tsparticles" />
        <Navigation onRouteChange={ this.onRouteChange }/>

        { this.state.route === "signedOut" ?
            <SignIn onRouteChange={ this.onRouteChange }/> :
            <>
              <Logo />
              <Rank />
              <ImageUrlInput 
                onInputChange={ this.onInputChange } 
                onButtonSubmit={ this.onButtonSubmit }
              />
              <FaceRecognition image_url={ this.state.imageUrl } box={ this.state.box }/>
            </>
        }
        
      </div>
    );
  }
  
}

export default App;
