import { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageUrlInput from './components/imageurlinput/ImageUrlInput';
import Rank from './components/rank/Rank';
import ParticlesComponent from './components/particles/ParticlesComponent';
import FaceRecognition from './components/prediction/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



const initialState = {
  input: "",
  imageUrl: "",
  box: [],
  route: "signin",
  isLoggedIn: false,
  user: {
    id: "",
    username: "",
    email: "",
    entries: 0,
    joined: ""
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }


  boxFace = (results) => {
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    const boxes = results.map(face => {
      return {
        leftCol: width * face.region_info.bounding_box.left_col,
        topRow: height * face.region_info.bounding_box.top_row,
        rightCol: width - (width * face.region_info.bounding_box.right_col),
        bottomRow: height - (height * face.region_info.bounding_box.bottom_row),
        predictionValue: "value: " + face.value
      }
    })

    return boxes;
  }

  displayBoxFace = (calculatedBox) => {
    this.setState({ box: calculatedBox });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    let reqOptions = {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          imageUrl: this.state.input
      })
    }

    fetch("http://localhost:8080/face-recognition", reqOptions)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.status);
      }
    })
    .then(data => this.displayBoxFace(this.boxFace(data)))
    .catch(error => console.log(error));
  }
 
  onRouteChange = (newRoute) => {
    if (newRoute === "signin") {
      this.setState(initialState);
    } else if (newRoute === "home") {
      this.setState({ isLoggedIn: true });
    }

    this.setState({ route: newRoute });
  }

  loadUserData = (userData) => {
    this.setState({ user: {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }})
  }

  increaseEntries = (user) => {
    let reqOptions = {
      method: "put",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          id: user.id
      })
    }

    fetch("http://localhost:8080/image", reqOptions)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(entryCount => {
      this.setState(Object.assign(this.state.user, { entries: entryCount }));
    })
    .catch(error => console.log(error));
  }

  render () {
    return (
      <div className="App">
        <Navigation onRouteChange={ this.onRouteChange } isLoggedIn={ this.state.isLoggedIn } />
        <ParticlesComponent id="tsparticles" />

        { this.state.route === "home" ? 
            <>
              <Logo />
              <Rank username={this.state.user.username} entries={this.state.user.entries} />
              <ImageUrlInput 
                onInputChange={ this.onInputChange } 
                onImageSubmit={ this.onImageSubmit }
              />
              <FaceRecognition image_url={ this.state.imageUrl } box={ this.state.box }/>
            </> : (
              this.state.route === "signin" ? 
              <SignIn onRouteChange={ this.onRouteChange } loadUserData={ this.loadUserData }/> : 
              <Register onRouteChange={ this.onRouteChange } loadUserData={ this.loadUserData } />
              )
            }
      </div>
    );
  }
  
}

export default App;
