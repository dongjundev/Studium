import React, { Component } from 'react';
import './login.css';
// import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FacebookLoginButton } from 'react-social-login-buttons';


class Login extends Component{
  render() {
    return (
      <div className="container">
        <div className="login-form">
          <div id="login-header">
            <h1><span className="login-title">Stadium</span></h1>
            
            <h3 className="logintext-center">Login</h3>
          </div>

          <div>
            <div className="login-inputarea">
              <input id="login-id-area" type="ID" placeholder="Enter your Id"></input>
            </div>
          </div>
          <div>
            <div className="login-inputarea">
              <input id="login-password-area" type="Password" placeholder="Enter your Password"></input>
            </div>
          </div>
          <div>
            <div className="login-btn-login-area">
              <button className="btn-lg">Log in</button>
            </div>
          </div>
            <div className="login-text-center"> 
                or continue with your social account
            </div>
          {/* <FacebookLoginButton className="mt-3 mb-3">
            
          </FacebookLoginButton> */}
          <div className="text-center">
            <a href="/sign-up">Sign up</a>
            <span className="p-2">|</span>
            <a href="/forgot-password">Forgot Password</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;