import React from "react";
import "./App.css";
// import styled from "styled-components";
import { StyledButton } from "./components/StyledButton";
import * as firebase from "firebase/app";
import { signOut } from "./utils/authentication";
import LoginForm from "./LoginForm";

let headers = { token: "" };

const logToken = params => {
  console.log(headers);
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false
    };
  }

  setKeepLogin = value => {
    this.setState({
      rememberLogin: value
    });
  };

  setLoggedIn = value => {
    this.setState({
      isLoggedIn: value
    });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // refreshToken(headers);
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.isLoggedIn ? (
            <>
              <StyledButton
                onClick={() => {
                  // sendRequest(headers);
                  logToken(headers);
                }}
              >
                Log Token
              </StyledButton>
              <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
            </>
          ) : (
            <LoginForm headers={headers} setLoggedIn={this.setLoggedIn} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
