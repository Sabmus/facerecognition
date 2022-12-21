import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ image_url, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={ image_url } alt="" width={"500px"} height={"auto"} id={"inputImage"}/>
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
                    {box.predictionValue}
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;