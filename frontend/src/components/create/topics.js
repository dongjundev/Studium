import React, { Component } from 'react';
import './topics.css';
// //import { Button, Form, FormGroup, Label, Input }
//     from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
//import ReactDOM from 'react-dom';


class topics extends Component{

  constructor() {
    super()
    this.state = {
      options: []
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
    
    return (
      
      <div className='topics'>
        <div className="topics-row-step">
          <div classNam="topics-stepbox">
            <p id="topics-step">2/4단계</p>
          </div>
        <form className="topics-contents-all">
          <div className="topics-contents-box">
            <h2>만드실 그룹의 주제 혹은 관심사 몇가지를 선택해 주세요</h2>
            <div className="topics-contents-sub">
              <p id="topics-subbox">선택하신 주제와 관심사가 구체적이면 비슷한 관심사를 가진
                사람들에게 더욱 노출되기 쉬워집니다. <br /> 주제는 최대 3개 까지 선택이 가능합니다.</p>
            </div>
            <div className="topics-contents-wrap">
              <ul className="topics-subjectKinds">
                <li>
                  <div className="input-group" >
                    <input name="option1" type="checkbox" value={1} onChange={this.onChange.bind(this)}/>
                    <label for="option1">Option1&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input name="option2" type="checkbox" value={2} onChange={this.onChange.bind(this)}/>
                    <label for="option2">Option2&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input name="option3" type="checkbox" value={3} onChange={this.onChange.bind(this)}/>
                    <label for="option3">Option3&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input name="option4" type="checkbox" value={4} onChange={this.onChange.bind(this)}/>
                    <label for="option4">Option4&nbsp;&nbsp;</label>
                  </div>
                </li>
                <li>
                  <div className="input-group">
                    <input name="option5" type="checkbox" value={5} onChange={this.onChange.bind(this)}/>
                    <label for="option5">Option5&nbsp;&nbsp;</label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
        </form>
        
        <div className="topics-Footer">
          <div className="topics-Footer-box">
            <Link to="./start">
              <button className="topics-btn">이전</button>
            </Link>
            <Link to="./groupName">
              <button className="topics-btn">다음</button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default topics;