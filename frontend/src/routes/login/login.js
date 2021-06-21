import React, { Component, useState, useEffect } from 'react';
import './login.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
// import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FacebookLoginButton } from 'react-social-login-buttons';


class Login extends Component{

  constructor(props){
    super(props);
    this.state ={
        memberId : '',
        memberPassword : ''
    };
    
    this.handleRequest = this.handleRequest.bind(this);
  }
  handleRequest = async () =>{
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8080/login.do',
      data: {
        memberId : this.state.memberId,
        memberPassword : this.state.memberPassword
      }
    });
    console.log(response);
  }

  // inputId = (e) =>{
  //   this.setState({
  //     memverID : e.target.value
  //   })
  // }

  // inputPassword = (e) =>{
  //   this.setState({
  //     memverPassword : e.target.value
  //   })
  // }

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
              <input id="login-id-area" type="ID" placeholder="Enter your Id" name={'memberId'} 
                    value={this.state.memberId} 
                    onChange={(e) => this.setState({memberId : e.target.value})} ></input>
            </div>
          </div>
          <div>
            <div className="login-inputarea">
              <input id="login-password-area" type="Password" placeholder="Enter your Password" name={'memberPassword'} 
                    value={this.state.memberPassword} 
                    onChange={(e) => this.setState({memberPassword : e.target.value})}
              ></input>
            </div>
          </div>
          <div>
            <div className="login-btn-login-area">
              <button className="btn-lg" onClick={this.handleRequest}>Log in</button>
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