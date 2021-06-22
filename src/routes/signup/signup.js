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
      memberId : "",
      memberPassword : "",
      memberRepassWord : "",
      memberName : "",
      memberBirth : "",
      memberGender : "",
      memberAddress : "",
      memberEmail : "",
      memberAccount : "",
      pMessage:'',
      usableId : false
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest = async () => {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:8080/signup.do',
      data: {
        memberId : this.state.memberId,
        memberPassword : this.state.memberPassword,
        memberName : this.state.memberName,
        memberAddress : this.state.memberAddress,
        memberGender : this.state.memberGender
      }
    });
    console.log(response);
    console.log(response.data);

    if (response.data=="no-id"){
      alert("중복된 아이디입니다!");
    }else{
      alert("회원가입 완료!");

      document.location.href = "http://localhost:3000/login";
    }
  }

  inputId = (e) => {
    this.setState({
      memberId : e.target.value    
      })
  }



  // clickSignup = (e) => {
  //   e.preventDefault();
  //   const {memberId, memberPassword, memberBirth, memberEmail, memberAccount, usableId} = this.state;

  //     if( usableId === false){
  //       alert("아이디 중복체크를 해주세요.")
  //     }
  //     else if(!memberId || !memberPassword || memberBirth || memberEmail || memberAccount){
  //       alert("필수 항목 모두 작성해주세요.")
  //     }
  //     else{
  //       fetch("http://localhost:3000/signup", {
  //         //백 api 호출하기
  //         method: "POST",
  //         headers:{
  //           "Content-Type" : "application/json"
  //         },
  //         body: JSON.stringify({
  //           user_id : this.state.memberId,
  //           user_password : this.state.memberPassword,
  //           user_birth : this.state.memberBirth,
  //           user_email : this.state.memberEmail,
  //           user_account : this.state.memberAccount
  //         })// 이 컴포넌트에 저장된 state값중에 필요한 항목들만 POST
  //       }).then(res => {if(res.status === 400){
  //         alert("다시 한 번 확인해주세요.");
  //       }else{
  //         alert("가입 완료");
  //         this.props.history.push("/") // 로그인 완료 후 메인페이지로 이동
  //       }
  //     })
  //   }
  // }

  idCheck = (e) => {
      e.preventDefault();
      const { usableId } = this.state; // 비구조화 할당

      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({usableId: this.state.memberId})
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

  handleConfirmPassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }) //사용자가 입력한 값을 setState함수를 통해 업데이트
    if (e.target.value !== this.state.memberRepassWord) {
      this.setState({
        pMessage: "❌ 비밀번호가 일치하지 않습니다 :("
      }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우
    }
    else if (e.target.value === '') {
      this.setState({
        pMessage: ''
      }) // 아직 아무것도 입력하지 않았다면 당연히 메시지 띄워주면 안된다.
    }
    else if (e.target.value === this.state.memberRepassWord) {
      this.setState({
        pMessage: "✅ 비밀번호가 일치합니다 :)"
        
      }) // 사용자가 입력한 비밀번호가 두개 다 일치하면 보여주는 메시지.
    }
  }

  handleConfirmrePassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value !== this.state.memberPassword) {
      this.setState({
        pMessage: "❌ 비밀번호가 일치하지 않습니다 :("
      })
    }
    else if (e.target.value === '') {
      this.setState({
        pMessage: ''
      })
    }
    else if (e.target.value === this.state.memberPassword) {
      this.setState({
        pMessage: "✅비밀번호가 일치합니다 :)"
      })
    }
  } 


  render() {
    return (
      <div className="container">
        <div className="signup-form">
          <div id="signup-header">
            <h1 className="text-center">회원가입</h1>
          </div>
        <div className="signup-container">
          <div>
            <div className="signup-inputarea">
              <input id="signup-id-area" type="ID" placeholder="아이디"  name={'memberId'}
                  value={this.state.memberId} 
                  onChange={(e) => this.setState({memberId : e.target.value})}></input>
          </div>
            <div className="signup-inputarea">
              <input id="signup-password-area" type="Password" placeholder="비밀번호" name={'memberPassword'} 
                  value={this.state.memberPassword}
				          onChange={this.handleConfirmPassword} onChange={(e) => this.setState({memberPassword : e.target.value})}></input>
                  {/* onChange={this.handleConfirmPassword} onChange={(e) => this.setState({memberPassword : e.target.value}) */}
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-passwordCheck-area" type="Password" placeholder="비밀번호 확인" name={'memberRepassWord'} 
                  value={this.state.memberRepassWord}
				          onChange={this.handleConfirmrePassword}></input>
                  <p className="checktext">{this.state.pMessage}</p>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-name" type="text" placeholder="이름" name={'memberName'}
                      value ={this.state.memberName}
                      onChange={(e) => this.setState({memberName : e.target.value})}></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <input id="signup-address" type="text" placeholder="지역" name={'memberAddress'}
                      value ={this.state.memberAddress}
                      onChange={(e) => this.setState({memberAddress : e.target.value})}
              ></input>
            </div>
          </div>
          <div>
            <div className="signup-inputarea">
              <div className="switch-field">
                <input type="radio" value="M" name={'memberGender'} id="radio-one" name="switch-one" onChange={(e) => this.setState({memberGender : e.target.value})} checked></input>
                <label id="signup-checkGender" for="radio-one">남성</label>
                <input type="radio" value="F" name={'memberGender'} id="radio-two" name="switch-one" onChange={(e) => this.setState({memberGender : e.target.value})}></input>
                <label id="signup-checkGender" for="radio-two">여성</label>
              </div>
            </div>
          </div>
          <div>
            <div className="signup-btn-login-area">
              <button className="btn-lg signup-button" onClick={this.handleRequest}>가입</button>
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