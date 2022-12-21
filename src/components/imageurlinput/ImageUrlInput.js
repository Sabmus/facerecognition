import React from "react";
import './imageurlinput.css'

const ImageUrlInput = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3">
                {"Hello! this is a face recognition app, you should try it!"}
            </p>
            <div className="center">
                <div className="center pa4 br3 shadow-5 image-input">
                    <input className="f4 pa2 w-70" type="text" placeholder="image url" onChange={ onInputChange }/>
                    <button className="w-30 grow f4 ph3 pv2 white bg-light-purple ba" onClick={ onButtonSubmit }>{"detect"}</button>
                </div>
            </div>
        </div>
    );
}

export default ImageUrlInput;
