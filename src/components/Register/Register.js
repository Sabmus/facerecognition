import React, { Component } from "react";

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName: "",
            newEmail: "",
            newPassword: "",
            newPasswordConfirm: ""
        }
    }
    
    onNameChange = (event) => {
        this.setState({ newName: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ newEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ newPassword: event.target.value });
    }

    onPasswordConfirmChange = (event) => {
        this.setState({ newPasswordConfirm: event.target.value });
    }

    onSubmit = () => {
        let reqOptions = {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.newName,
                email: this.state.newEmail,
                password: this.state.newPassword,
                passwordConfirm: this.state.newPasswordConfirm
            })
        }

        fetch("http://localhost:8080/register", reqOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(user => {
            this.props.loadUserData(user);
            this.props.onRouteChange("home");
        })
        .catch(error => console.log(error))
    }

    
    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Username</label>
                        <input 
                            onChange={ this.onNameChange }
                            className="pa2 input-reset bg-transparent ba b--black hover-bg-black-20 hover-white w-100" 
                            type="text" 
                            name="name" 
                            id="username" autoFocus/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            onChange={ this.onEmailChange }
                            className="pa2 input-reset bg-transparent ba b--black hover-bg-black-20 hover-white w-100"
                            type="email"
                            name="email-address"
                            id="email-address" autoFocus/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input
                            onChange={ this.onPasswordChange }
                            className="b pa2 input-reset bg-transparent ba b--black hover-bg-black-20 hover-white w-100"
                            type="password"
                            name="password"
                            id="password" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                        <input 
                            onChange={ this.onPasswordConfirmChange }
                            className="b pa2 input-reset bg-transparent ba b--black hover-bg-black-20 hover-white w-100"
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm" />
                    </div>
                    <label className="pa0 ma0 lh-copy f6 pointer"></label>
                    </fieldset>
                    <div className="">
                    <input onClick={ this.onSubmit } className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange("signin")} className="f6 dim black db pointer grow">Sign In</p>
                    </div>
                </div>
            </main>
            </article>
        );
    }
}

export default Register;
