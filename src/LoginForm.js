import React from "react";
import "./App.css";
import { StyledButton } from "./components/StyledButton";
import { createUser, signIn, googleSignIn } from "./utils/authentication";
import * as firebase from "firebase/app";
import "firebase/auth";

// import styled from "styled-components";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkBox: true
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    signIn(data.get("email"), data.get("password"), this.props.headers);

    if (this.state.checkBox === true) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
  }

  handleInputChange(event) {
    this.setState({
      checkBox: !this.state.checkBox
    });
  }

  render() {
    return (
      <>
        <form onSubmit={event => this.handleSubmit(event)}>
          <label htmlFor="email">Enter your email</label>
          <input id="email" name="email" type="email" />
          <br />

          <label htmlFor="password">Enter password</label>
          <input id="password" name="password" type="password" />
          <br />

          <label htmlFor="remember">Remember login</label>
          <input
            name="remember"
            type="checkbox"
            checked={this.state.checkBox}
            onChange={() => this.handleInputChange()}
          />

          <br />
          <StyledButton>Sign in</StyledButton>
        </form>
        <StyledButton onClick={() => googleSignIn()}>
          Sign in with Google
        </StyledButton>
        <StyledButton onClick={() => createUser()}>Create User</StyledButton>
      </>
    );
  }
}
