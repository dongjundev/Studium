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
    console.log(response.data);
    // if (response.data=="ok"){
    //   var loginId=this.state.memberId;
    //   alert(loginId);
    //   document.location.href = "http://localhost:3000/";
    // }else if(response.data=="no-id"){
    //   alert("아이디가 존재하지 않습니다!");
    // }else{
    //   alert("비밀번호가 틀렸습니다!");
    // }
    if (response.data[0]=="no-id"){
      alert("아이디가 존재하지 않습니다!");
    }else if(response.data[0]=="404"){
      alert("비밀번호가 틀렸습니다!");
    }else{
      // var loginId=this.state.memberId;
      // alert(loginId);
      var loginName=response.data[1];
      alert(loginName+"님 반갑습니다!");
      sessionStorage.setItem('memberId',  this.state.memberId);
      sessionStorage.setItem('memberName',  loginName);
      // <Link to={{
      //   pathname: '/',
      //   state: {
      //       memberId: this.state.memberId,
      //       memberName:loginName,
      //   }
      // }}>
      // </Link>
      document.location.href = "http://localhost:3000/";
    }
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
        <div class="login-box">
        <div className="login-form">
        <div class="login">
          <div id="login-header"> 
            <h1 className="logintext-center">로그인</h1>
            <div>
              <Link to="/signup" class="h"> 
              아직 회원이 아니신가요?
              </Link>
              </div>
          </div>
          <div>
            <div className="login-inputarea">
              <input id="login-id-area" type="ID" placeholder="아이디" name={'memberId'} 
                    value={this.state.memberId} 
                    onChange={(e) => this.setState({memberId : e.target.value})} ></input>
            </div>
          </div>
          <div>
            <div className="login-inputarea">
              <input id="login-password-area" type="Password" placeholder="비밀번호" name={'memberPassword'} 
                    value={this.state.memberPassword} 
                    onChange={(e) => this.setState({memberPassword : e.target.value})}
              ></input>
            </div>
          </div>
          <div>
            <div className="login-btn-login-area">
              <button className="login-btn button" onClick={this.handleRequest}>로그인</button>
            </div>
          </div>
          </div>
          {/* <FacebookLoginButton className="mt-3 mb-3">
            
          </FacebookLoginButton> */}
        </div>
        </div>
      </div>
    );
  }
}

export default Login;