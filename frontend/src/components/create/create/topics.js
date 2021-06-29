import React, { Component } from 'react';
import './topics.css';
// //import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
//import ReactDOM from 'react-dom';


class topics extends Component{

  constructor(props) {
    super(props);
    if (this.state===1){
      
    }
    this.state = {
      options: [], // 현재 topics의 저장할 데이터
      location: this.props.location.state.location //start에서 지역 데이터 뽑기
    }
  }

  onChange(e){
    const options = this.state.options
    let index
    
    if(e.target.checked){
      options.push(+e.target.value)
    }
    else{
      index = options.indexOf(+e.target.value)
      options.splice(index, 1)
    }

    this.setState({options: options})

    console.log(options)
  }


  render() {
    const {location} = this.state;
    console.log(location);

    return (
      
      <div className='topics creat-study'>
        <div className="topics-row-step">
          <div classNam="topics-stepbox">
            <p id="topics-step">2/4단계</p>
            
          </div>
        <form className="topics-contents-all">
          <div className="topics-contents-box">
            <h2>만드실 그룹의 주제 혹은 관심사 몇가지를 선택해 주세요</h2>
            <div className="topics-contents-sub">
              <p id="topics-subbox">선택하신 주제와 관심사가 구체적이면 비슷한 관심사를 가진
                사람들에게 더욱 노출되기 쉬워집니다.</p>
            </div>
            <div className="topics-contents-wrap">
              <ul className="topics-subjectKinds">
              <li>
                  <div className="input-group" >
                    <input id="option1" name="외국어" type="checkbox" value={1} onChange={this.onChange.bind(this)} />
                    <label for="option1">#외국어&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option2" name="option2" type="checkbox" value={2} onChange={this.onChange.bind(this)}/>
                    <label for="option2">#자격증&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option3" name="option3" type="checkbox" value={3} onChange={this.onChange.bind(this)}/>
                    <label for="option3">#취업&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option4" name="option4" type="checkbox" value={4} onChange={this.onChange.bind(this)}/>
                    <label for="option4">#기술&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option5" name="option5" type="checkbox" value={5} onChange={this.onChange.bind(this)}/>
                    <label for="option5">#과학&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option6" name="option6" type="checkbox" value={6} onChange={this.onChange.bind(this)}/>
                    <label for="option6">#경제&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option7" name="option7" type="checkbox" value={7} onChange={this.onChange.bind(this)}/>
                    <label for="option7">#독서&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option8" name="option8" type="checkbox" value={8} onChange={this.onChange.bind(this)}/>
                    <label for="option8">#미술&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option9" name="option9" type="checkbox" value={9} onChange={this.onChange.bind(this)}/>
                    <label for="option9">#음악&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option10" name="option10" type="checkbox" value={10} onChange={this.onChange.bind(this)}/>
                    <label for="option10">#기타&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input id="option11" name="option11" type="checkbox" value={11} onChange={this.onChange.bind(this)}/>
                    <label for="option11">#취미&nbsp;&nbsp;</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </form>
        
        <div className="topics-Footer">
          <div className="topics-Footer-box">
            <Link to="./start">
              <button className="topics-btn creat-button">이전</button>
            </Link>
            <Link to={{
                pathname: '/groupName',
                state: {
                    location: location,
                    selectedTopics : this.state.options
                }
              }}><button className="topics-btn creat-button">다음</button></Link>
            
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default topics;