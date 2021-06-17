import React, { Component } from 'react';
import './start.css';
//import { BrowserRouter, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
//import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';




 class start extends Component{
   render() {
    return(
      <div className='start'>
        <div className="start-row-step">
          <div classNam="start-stepbox">
              <p id="start-step">1/4단계</p>
          </div>
          <form className="start-contents-all">
            <div className="start-contents-box">
              <h2 className="start-title">먼저, 그룹의 지역을 설정해 주세요.</h2>
              <div className="start-contents-sub">
                <p id="start-subbox">Stadium groups meet locally, in person and online. 
                  We'll connect you with people in your area, and more can join you online.</p>
              </div>
              <div className="start-contents-wrap">
                <input type="serach" name="venue" id="start-venueSearch" placeholder="지역 입력"/>
              </div>
            </div>
            
          </form>
          
          <div className="start-Footer">
            <div className="start-Footer-box">
              <Link to="./topics">
                <button>다음</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
   }
 }

 export default start;