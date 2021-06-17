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
                <Link to="/create-group">스터디 만들기</Link>
        </div>
        <div className="nav-login">
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
        </div>
    </div>
    );
}

export default Navigation;