import React, { useEffect, useState } from 'react';
import '../../index.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import NavbarLogin from './NavbarLogin';
import { useNavigate } from 'react-router-dom';

const UserD = () => {
    // let crn = localStorage.getItem("crn");
    const [crn,setCrn] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:5000/applicant/dashboard',{withCredentials:true})
        .then((response)=>{
            setCrn(response.data.crn);
        })
        .catch((err)=>{
            console.log(err);
            navigate('/login');
        })
    },[]);

    return (
        <>
            <div className="container">
                <NavbarLogin crn={crn} txt="CRN" />
                <div className="container flex align-items-center text-white py-5" style={{ backgroundColor: "#168aad" }} >

                    <div className="col-lg-10 ">
                        <h1 className="display-5 fw-bold text-white-emphasis lh-1 mb-3">Apply for the Conference here</h1>
                        <p className="lead ">Don't miss the opportunity to be part of an enriching and intellectually stimulating conference experience</p>
                        <p className="lead">Submit your research paper today and your place on the global stage of academic excellence</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to={"/user/applyconferences"} className="btn btn-light fw-bolder btn-lg px-4 me-md-2 " style={{ boxShadow: "rgba(0,0,0,0.4) 0px 2px 4px ,rgba(0,0,0,0.3) 0px 7px 13px -3px,rgba(0,0,0,0.2) 0px -3px 0px inset" }}>Apply</Link>
                            <Link type="button" to={"/user/checkstatus"} className="btn btn-light fw-bolder btn-lg px-4 me-md-2 " style={{ boxShadow: "rgba(0,0,0,0.4) 0px 2px 4px ,rgba(0,0,0,0.3) 0px 7px 13px -3px,rgba(0,0,0,0.2) 0px -3px 0px inset" }}>Check Status</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default UserD;