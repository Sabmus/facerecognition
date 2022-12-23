import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ image_url, box }) => {

    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={ image_url } alt="" width={"500px"} height={"auto"} id={"inputImage"}/>
                {
                    box.map(face => {
                        return (
                            <div className="bounding-box" style={{ top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol }}>
                                <span className="predicted-value">{face.predictionValue}</span> 
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default FaceRecognition;