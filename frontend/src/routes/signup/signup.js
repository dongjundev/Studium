import axios from 'axios';
import React, { Component } from 'react';
import './signup.css';
// import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

class signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      msg : '',
      user_id : "",
      user_password : "",
      user_birth : "",
      user_gender : "",
      user_email : "",
      user_account : "",
      usableId : false
    }
  }

  inputId = (e) => {
    this.setState({
         user_id : e.target.value    
      })
  }

  clickSignup = (e) => {
    e.preventDefault();
    const {user_id, user_password, user_birth, user_email, user_account, usableId} = this.state;

      if( usableId === false){
        alert("아이디 중복체크를 해주세요.")
      }
      else if(!user_id || !user_password || user_birth || user_email || user_account){
        alert("필수 항목 모두 작성해주세요.")
      }
      else{
        fetch("http://localhost:3000/signup", {
          //백 api 호출하기
          method: "POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            user_id : this.state.user_id,
            user_password : this.state.user_password,
            user_birth : this.state.user_birth,
            user_email : this.state.user_email,
            user_account : this.state.user_account
          })// 이 컴포넌트에 저장된 state값중에 필요한 항목들만 POST
        }).then(res => {if(res.status === 400){
          alert("다시 한 번 확인해주세요.");
        }else{
          alert("가입 완료");
          this.props.history.push("/") // 로그인 완료 후 메인페이지로 이동
        }
      })
    }
  }

  idCheck = (e) => {
      e.preventDefault();
      const { usableId } = this.state; // 비구조화 할당

      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({usableId: this.state.user_id})
      })
      .then(response => {if(response.status === 200){
        alert("사용 가능한 아이디 입니다.");
        this.setState({usableId: true})
      }else if(response.status === 409){
        alert("이미 가입되어 있는 아이디 입니다.");
      }else{
        alert("사용 불가한 아이디 입니다.");
      }
    });
  }


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
            <div className="signup-inputarea-id">
              <input id="signup-id-area" type="ID" placeholder="Enter your Id" onChange={this.inputId} name="memberId"></input>
                <div className="id-check">
                  <button className="btn-id-check">중복체크</button>
                </div>
              <div>
            </div>
          </div>
            <div className="signup-inputarea">
              <input id="signup-password-area" type="Password" placeholder="Enter your Password" name="memberPassword"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-passwordCheck-area" type="Password" placeholder="Enter your Password one more"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-name" type="text" placeholder="Enter your Name" name="memberName"></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-address" type="text" placeholder="Enter your Address" name="memberAddress"></input>
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
                <input  type="radio" value="M" name="memberGender" ></input>
                   Man
              </label>
              <label id="signup-checkGender">
                <input  type="radio" value="M" name="memberGender"></input>
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
              <button className="btn-lg" onClick={this.clickSignup}>Sign up</button>
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