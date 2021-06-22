import React, { Component } from 'react';
import './createEvent.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from "axios";
import MapContainer  from './MapContainer'
//import { BrowserRouter, Route } from 'react-router-dom';
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

 class createEvent extends Component{

    constructor(props){
      super(props);
      this.state = {
        study_id : this.props.location.state.studyId, //study id 받는 부분
        event_name: "",
        event_location : "",
        event_date : "",
        eventStartTime : "",
        eventEndDate : "",
        eventEndTime : "",
        event_description : "",
        btnColorState : "",
      };
      this.handleRequest = this.handleRequest.bind(this);
    }
  

    sendStudyData = () =>{
      console.log("함수 들어옴ㅇㅇ");
      this.handleRequest();
      this.opensweetalert();
    }

    handleChange = (e) =>{
      var textlength = e.target.value.length;
      this.setState({
        event_description:e.target.value,
      })
      console.log(textlength);
    }

    

    handleRequest = async () =>{
      console.log("함수 들어옴");
      console.log(this.state.event_name);
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/create-event.do',
        data: {
            studyId : this.state.study_id,
            eventName : this.state.event_name,
            eventLocation : this.state.event_location,
            eventDate : this.state.event_date,
            eventDescription : this.state.event_description
        }
      });
      console.log(response);
    }

  

  opensweetalert(){
    Swal.fire({
      title: '생성 완료',
      text: "축하합니다! 이벤트 생성이 완료되었습니다",
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

  handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file : file,
        previewURL : reader.result
      })
    }
    reader.readAsDataURL(file);
  }


   render() {
    const {study_id, event_name, event_location, event_date, eventStartTime, eventEndDate, eventEndTime, event_description} = this.state;
    console.log(event_name, event_location, event_date, eventStartTime, eventEndDate, eventEndTime, event_description);
    return(
      <div className='createEvent'>
        <div className="createEvent-row-step">
          <div classNam="createEvent-stepbox">
            
          </div>
          <form className="createEvent-contents-all">
            <div className="createEvent-contents-box">
              <h1>&#127880; 이벤트 생성하기</h1>
              <div className="createEvent-contents-sub">
                <p id="createEvent-subbox">여러분들의 그룹내에서 특별한 소모임을 만들 수 있습니다. <br />
                    여러분만의 특별한 이벤트를 만들어 사람들과 소통할 공간을 만들어 보세요!</p>
              </div>
              <div className="createEvent-contents-wrap">
                <ul className="createEvent-subjectKinds">
                    <li className="createEvent-line">
                        <label>
                            <p id="creatEvent-subtitle">이벤트 제목</p>  <br />
                            <input type="serach" name="event_name" id="createEvent-event_name" placeholder="이벤트 제목 입력" onChange={(e) => this.setState({event_name : e.target.value})} autocomplete="off"/>
                        </label>
                    </li>
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* <li className="createEvent-line">
                        썸네일 및 소개할 사진이 있다면 올려보세요<br />
                        <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='thumbnail_img' 
                            onChange={this.handleFileOnChange}>
                        </input>
                    </li> */}
                    <li className="createEvent-line">
                        <label>
                            <p id="creatEvent-subtitle"> 모임을 가질 장소를 알려주세요</p><br />
                            <MapContainer/>
                            <input type="serach" name="event_location" id="createEvent-location" placeholder="모임 장소 입력" onChange={(e) => this.setState({event_location : e.target.value})} autocomplete="off"/>
                        </label>
                    </li>
                    <br></br>
                    <br></br>
                    <br></br>
                    <li className="createEvent-line">
                        <label>
                            <p id="creatEvent-subtitle"> 이벤트가 진행될 날짜를 선택하세요</p><br />
                            <input type="date" name="event_date" id="event_date" onChange={(e) => this.setState({event_date : e.target.value})} autocomplete="off"/>
                        </label>
                    </li>
                    <br></br>
                    <br></br>
                    <br></br>
                </ul>
              </div>
            </div>
            <div>
              <div className="createEvent-inputContainer">
              <p id="creatEvent-subtitle"> 이벤트 내용을 입력하세요</p><br />
                <form>
                    <textarea value={this.state.event_description} id="createEvent-event_description" minLength="10" name="event_description" 
                      onChange={this.handleChange} cols="70" rows="10" placeholder="이벤트 내용을 작성해 주세요.">
                    </textarea>
                </form>
              </div>
              
            </div>
          </form>
          
          <div className="createEvent-Footer">
            <div className="createEvent-Footer-box">
              <Link to="../">
                <button className="save-btn create-event-button" onClick={this.sendStudyData}>이벤트 생성</button>
                {/* disabled={this.state.inputarea.length<50} */}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
   }
 }


 export default createEvent;