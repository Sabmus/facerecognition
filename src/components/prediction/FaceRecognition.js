import React from "react";

const FaceRecognition = ({ image_url }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img src={ image_url } alt="" width={"500px"} height={"auto"} />
            </div>
        </div>
    );
}

export default FaceRecognition;