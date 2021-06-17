import React, { Component } from 'react';
import './description.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
//import { BrowserRouter, Route } from 'react-router-dom';
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

 class description extends Component{

    constructor(){
      super();
      this.state = {
        inputarea:"",
        btnColorState : false
      }
    }

    handleChange = (e) =>{
      var textlength = e.target.value.length;
      this.setState({
        inputarea:e.target.value
      })
      console.log(textlength);
  }

  opensweetalert(){
    Swal.fire({
      title: 'Done!',
      text: "create group!",
      type: 'success',
    })
  }

  opensweetalertdanger()
  {
    Swal.fire({
      title: 'Please Check ',
      text: "OOPS",
      type: 'warning',
    })
  }


   render() {

    return(
      <div className='description'>
        <div className="description-row-step">
          <div classNam="description-stepbox">
              <p id="description-step">4/4단계</p>
          </div>
          <form className="description-contents-all">
            <div className="description-contents-box">
              <h2>이제 그룹에 관한 설명을 작성해 주세요</h2>
              <div className="description-contents-sub">
                <p id="description-subbox">설명글은 회원들에게 그룹을 홍보할 때 표시됩니다. <br />
                변경사항이 있다면 나중에 언제든지 업데이트가 가능합니다.</p>
              </div>
              <div className="description-contents-wrap">
                <ul className="description-subjectKinds">
                    <li>1. 그룹의 목적은 무엇인가요?</li>
                    <li>2. 어떠한 회원을 모집하나요?</li>
                    <li>3. 이 그룹에선 어떠한 이벤트가 진행되나요?</li>
                </ul>
              </div>
            </div>
            <div>
              <div className="description-inputContainer">
                <form>
                    <textarea value={this.state.inputarea} id="description-textarea" minLength="50" name="inputarea" 
                      onChange={this.handleChange} cols="70" rows="10" placeholder="최소 50자 이상 작성해 주세요.">
                    </textarea>
                </form>
              </div>
              <ul>
                <li className="description-text-error" >필수사항</li>
              </ul>
            </div>
          </form>
          
          <div className="description-Footer">
            <div className="description-Footer-box">
              <Link to="../">
                <button className="save-btn" disabled={this.state.inputarea.length<50}  onClick={this.opensweetalert}>다음</button>
                {/* disabled={this.state.inputarea.length<50} */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
   }
 }

 export default description;