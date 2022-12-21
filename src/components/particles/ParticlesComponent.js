import React from "react";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    fpsLimit: 70,
    /**interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: "push",
            },
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 100,
                duration: 0.4,
            },
        },
    },*/
    particles: {
        color: {
            value: "#ffffff",
        },
        links: {
            color: "#ffffff",
            distance: 100,
            enable: true,
            opacity: 0.5,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            directions: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 70,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    detectRetina: true,
}

const ParticlesComponent = (props) => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);
  
    /*const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);*/

    return (
        <Particles id={props.id}
            init={particlesInit}
            //loaded={particlesLoaded}
            options={particlesOptions}
        />
    );
}

export default ParticlesComponent;
