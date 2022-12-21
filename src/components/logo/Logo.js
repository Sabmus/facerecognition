import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo_png from './logo.png'

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{ height: "150px", width: "150px" }}>
        <Tilt glareEnable={true} gyroscope={true}>
            <div className="Tilt br2 shadow-2 pa3" style={{ height: "150px", width: "150px" }}>
                <img src={logo_png} alt="logo" style={{ height: "100px", width: "100px", paddingTop: "5px" }}/>
            </div>
        </Tilt>
        </div>
    );
}

export default Logo;
