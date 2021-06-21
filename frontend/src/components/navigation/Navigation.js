import React from "react"
import { Link } from "react-router-dom"
import './Navigation.css'

function Navigation(){
    return (
    <div className="nav">
        <div className="nav-logo">
            <Link to="/">
                <img src="/images/studium_logo.png"></img>
            </Link>
        </div>
        <div className="create-group">
                <Link to="/start">새 그룹 시작하기</Link>
        </div>
        <div className="nav-login">
            {sessionStorage.getItem('memberName') !== null ? 
                <div  style={{color: "white"}}>
                    {sessionStorage.getItem('memberName')}님 안녕하세요 <button>로그아웃</button>
                </div>
                :
                <div>
                    <Link to="/login">로그인</Link>
                    <Link to="/signup">회원가입</Link>
                </div>
            // {/* <Link to="/login">로그인</Link>
            // <Link to="/signup">회원가입</Link> */}
            }
        </div>
    </div>
    );
}

export default Navigation;
