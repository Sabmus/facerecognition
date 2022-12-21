import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageUrlInput from './components/imageurlinput/ImageUrlInput';
import Rank from './components/rank/Rank';
import ParticlesComponent from './components/particles/ParticlesComponent';

function App() {
  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageUrlInput />
      {
      /*
        <FaceRecognition />
      */
      }
    </div>
  );
}

export default App;
