import React, { Component } from 'react';
import './groupName.css';
// import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'


class groupName extends Component{
  render() {
    return (
      <div className='groupName'>
        <div className="groupName-row-step">
          <div classNam="groupName-stepbox">
              <p id="groupName-step">3/4단계</p>
          </div>
          <form className="groupName-contents-all">
            <div className="groupName-contents-box">
              <h2>그룹의 이름을 설정해 주세요.</h2>
              <div className="groupName-contents-sub">
                <p id="groupName-subbox">사람들이 그룹의 성격과 내용을 파악할 수 있는 이름을 지어주세요. <br />
                  떠오르는 기발한 이름이 있나요? 마음이 바뀌면 나중에 다시 변경할 수 있습니다.</p>
              </div>
              <div className="groupName-contents-wrap">
                <input type="serach" name="venue" id="groupName-venueSearch" 
                      placeholder="ex) 휴스타3기 자격증 취득반"/>
              </div>
            </div>
            
          </form>
          
          <div className="groupName-Footer">
            <div className="groupName-Footer-box">
              <Link to="./description">
                <button>다음</button>
              </Link>
            </div>
          </div>
        </div>
    </div>
    );
  }
}

export default groupName;