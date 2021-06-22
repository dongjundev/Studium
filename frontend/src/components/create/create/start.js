import React, { Component } from 'react';
import './start.css';
//import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

 class start extends Component{
   constructor(){
    super();
    this.state ={
      locationValue: '' // 현재 start의 저장할 데이터
    }
   }

   onChangeLocation(e){
     this.setState({
       locationValue: e.target.value
     });
   }

   render() {
    
    return(
      <div className='start creat-study'>
        <div className="start-row-step">
          <div classNam="start-stepbox">
              <p id="start-step">1/4단계</p>
              
          </div>
          <form className="start-contents-all" autocomplete="off">
            <div className="start-contents-box">
              <h2 className="start-title">그룹의 지역을 설정해 주세요</h2>
              <div className="start-contents-sub">
              </div>
              <div className="start-contents-wrap">
                <input type="serach" name="venue" id="start-venueSearch" placeholder="ex) 대구광역시 동구" onChange={this.onChangeLocation.bind(this)}/>
              </div>
            </div>
          </form>
          
          <div className="start-Footer">
            <div className="start-Footer-box">
            <Link to={{
                pathname: '/topics',
                state: {
                    location: this.state.locationValue
                }
              }}><button className="creat-button">다음</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
   }
 }

 export default start;