import React from 'react';
import {Navigate,useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {

    const { Component } = props;
    
    const navigate = useNavigate();

    let login = localStorage.getItem("crn");

    if (!login) {
        // return <Navigate to={"/login"} /> 
        return (
            <Component />
        )
    }
    else{
        console.log("logged-in")
        return (
            <Component />
        )
    }
}

export default ProtectedRoute;