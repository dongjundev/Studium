import React from "react"
import { Link } from "react-router-dom"
import './Footer.css'

function Footer(){
    return (
    <div className="footer">
        <div className="footer-nav">
            <div className="footer-nav-detail">
                <div className="footer-nav-mypage">
                    <p className="foot-nav-title">내 계정</p>
                    <ul>
                        <li>
                            <Link to="/lgoin">로그인</Link>
                        </li>
                        <li>
                            <Link to="/register">회원가입</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-nav-search">
                    <p className="foot-nav-title">탐색</p>
                    <ul>
                        <li>
                            <Link to="/none">그룹</Link>
                        </li>
                        <li>
                            <Link to="/noen">이벤트</Link>
                        </li>
                        <li>
                            <Link to="/noen">캘린더</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-nav-company">
                    <p className="foot-nav-title">STUDIUM</p>
                    <ul>
                        <li>
                            <Link to="/company-info">정보</Link>
                        </li>
                        <li>
                            <Link to="/company-members">팀원</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="footer-info">
                <h1>STUDIUM</h1>
                <p>대구 동구 동내로 70 302호</p>
                <p>studium@gmail.com</p>
                <p>copyright(c) STUDIUM. All rights reserved.</p>
        </div>
    </div>
    );
}

export default Footer;