import axios from 'axios'
import React, { Component, useState, useEffect } from 'react';

class AuthenticationService extends Component{
    executeJwtAuthenticationService(MemberId, MemberPassword){
        return axios.post('http://localhost:8080/login.do',{
            MemberId,
            MemberPassword
        })
    }

    executeHelloService(){
        console.log("===executeHelloService===");
        return axios.get('http://localhost:8080/login');
    }

    registerSuccessfulLoginForJwt(MemberId, token){
        console.log("===registerSuccessfulLoginForJwt===");
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', MemberId);

        this.setupAxiosInterceptors();
    }

    createJWTToken(token){
        return 'Bearer ' + token;
    }

    setupAxiosInterceptors(){
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if(token){
                    console.headers['Authorization'] = 'Bearer' + token;
                }

                return config;
            },
            error =>{
                Promise.reject(error)
            });
    }

    logout(){
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn(){
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck===");
        console.log(token);

        if(token){
            return true;
        }
        return false;
    }

    getLoggedInUserName(){
        let user  = localStorage.getItem('authenticatedUser');
        if(user === null) return '';
        return user;
    }

}
export default new AuthenticationService()