import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React from "react"
import { Link } from "react-router-dom"
import './Navigation.css'

function Navigation(){

    async function doLogout() {
        if(window.confirm("로그아웃 하시겠습니까?")){
            const url = "http://localhost:8080/logout.do";
            const date = await axios.get(url);
            sessionStorage.clear();
            document.location.href = "http://localhost:3000";
        }
    }
    function loginCheck(){
        if (sessionStorage.getItem('memberName') == null){
            console.log("값 찍힘");
            return alert("로그인이 필요합니다!");
        } 
        document.location.href = "http://localhost:3000/start";
    }
    return (
    <div className="nav">
        <div className="nav-logo">
            <Link to="/">
                <img src="/images/studium_logo.png"></img>
            </Link>
        </div>
        <div className="create-group">
                <button onClick={loginCheck}>새 그룹 시작하기</button>
        </div>
        <div className="nav-login">
            {sessionStorage.getItem('memberName') !== null ? 
                <div>
                    <Link to="/mypage">
                    <span className="member-name">{sessionStorage.getItem('memberName')}</span>
                    </Link>
                    님 안녕하세요 <button onClick={doLogout}>로그아웃</button>
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
