import React, { Component, useState, useEffect } from 'react';
import './login.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import AuthenticationService from './AuthenticationService.js'
// import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FacebookLoginButton } from 'react-social-login-buttons';

const MemberId = MemberId;
const MemberPassword = MemberPassword;

class Login extends Component{

  constructor(props){
    super(props);
    this.state ={
        MemberId :'',
        // MemberId :localStorage.getItem("authenticatedUser") || '',
        MemberPassword : '',
        token: '',
        // token: localStorage.getItem("token") || '',
        hasLoginFailed: false,
        showSuccessMessage: false
    }
    //this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
    
    this.handleRequest = this.handleRequest.bind(this);

  }

  

  handleRequest = async () =>{
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8080/login.do',
      data: {
        MemberId : this.state.MemberId,
        MemberPassword : this.state.MemberPassword
      }
    });
    console.log(response);
  }

  loginClicked(){
    AuthenticationService
    .executeJwtAuthenticationService(this.state.MemberId, this.state.MemberPassword)
    .then((response) => {
      console.log(response)
      this.setState({
        token: response.data.token
      });
      AuthenticationService.registerSuccessfulLoginForJwt(this.state.MemberId, this.state.token)
      // this.props.history.push('//${this.state.MemberId}')
    }).catch( () =>{
      this.setState({showSuccessMessage:false})
      this.setState({hasLoginFailed:true})
    })
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
  
  onLogin = (MemberId, MemberPassword) => {
    const data = {
      MemberId,
      MemberPassword,
    };
    axios.post('/login', data).then(response => {
      const { accessToken } = response.data;
  
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
      // accessToken을 localStorage, cookie 등에 저장하지 않는다!
  
    }).catch(error => {
      alert("로그인 처리 실패");
      // ... 에러 처리
    });
  }


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
              <input id="login-id-area" type="ID" placeholder="Enter your Id" name={'MemberId'} 
                    value={this.state.MemberId} 
                    onChange={(e) => this.setState({MemberId : e.target.value})} ></input>
            </div>
          </div>
          <div>
            <div className="login-inputarea">
              <input id="login-password-area" type="Password" placeholder="Enter your Password" name={'MemberPassword'} 
                    value={this.state.MemberPassword} 
                    onChange={(e) => this.setState({MemberPassword : e.target.value})}
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