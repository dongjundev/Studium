import React, { Component } from 'react';
import './signup.css';
// import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

class signup extends Component {
  render() {
    return (
      <div className="container">
        <div className="signup-form">
          <div id="signup-header">
            <h1><span className="signup-title">Stadium</span></h1>
            
            <h3 className="text-center">Signup</h3>
          </div>
        <div className="signup-container">
          <div>
            <div className="signup-inputarea">
              <input id="signup-id-area" type="ID" placeholder="Enter your Id"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-password-area" type="Password" placeholder="Enter your Password"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-passwordCheck-area" type="Password" placeholder="Enter your Password one more"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-birthday" type="text" placeholder="Enter your birthday"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <label id="signup-checkGender">
                <input  type="radio" value="M" name="gender"></input>
                   Man
              </label>
              <label id="signup-checkGender">
                <input  type="radio" value="M" name="gender"></input>
                   Woman
              </label>

            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-email" type="text" placeholder="Enter your email"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-account" type="text" placeholder="Enter your account"></input>
            </div>
          </div>
          <div>
            <div className="signup-btn-login-area">
              <button className="btn-lg">Sign up</button>
            </div>
          </div>
            {/* <div className="text-center"> 
                or continue with your social account
            </div> */}
        
          {/* <FacebookLoginButton className="mt-3 mb-3">
            
          </FacebookLoginButton> */}
          {/* <div>

            <a href="/sign-up">Sign up</a>
            <span className="p-2">|</span>
            <a href="/forgot-password">Forgot Password</a>

          </div> */}
        </div>
      </div>
    </div>
    );
  }
}

export default signup;