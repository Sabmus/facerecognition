import React, { Component } from "react";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmit = () => {
        let reqOptions = {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        };
    
        fetch("http://localhost:8080/signin", reqOptions)
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
        .catch(error => console.log(error));
    }

    render() {
        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={ this.onEmailChange }
                            className="pa2 input-reset bg-transparent ba b--black hover-bg-black-20 hover-white w-100"
                            type="email"
                            name="email-address" 
                            id="email-address" autoFocus/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={ this.onPasswordChange }
                            className="b pa2 input-reset bg-transparent ba b--black hover-bg-black-20 hover-white w-100"
                            type="password"
                            name="password"
                            id="password" />
                    </div>
                    <label className="pa0 ma0 lh-copy f6 pointer"></label>
                    </fieldset>
                    <div className="">
                    <input onClick={ this.onSubmit }
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => this.props.onRouteChange("register")} className="f6 dim black db pointer grow">Register</p>
                    </div>
                </div>
            </main>
            </article>
        );
    }
}

export default SignIn;
