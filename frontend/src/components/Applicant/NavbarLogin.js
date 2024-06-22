import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavbarLogin = (props) => {

    const navigate = useNavigate();



    const handleLogout = () => {

        // setLogin(false);
        const baseurl = "http://localhost:5000";
        axios.get(`${baseurl}/user/logout`, { withCredentials: true })
            .then((res) => {
                localStorage.clear();
                navigate('/');
                console.log("logout clicked...")
            })
            .catch((err) => console.log("not logged-out due to technical error in server"));
    };



    return (
        <>
            <div className="container-fluid my-2  border d-flex align-items-center p-3 " style={{ backgroundColor: "#caf0f8" }}>
                <div className="col-lg-10 " >
                    <h1 className=' w-25 text-center'>{props.txt}</h1>
                    <p className="lead bg-light w-25 text-center">{props.crn}</p>
                </div>

                <button className='btn btn-lg h-25 btn-outline-dark' onClick={handleLogout}>logout</button>
            </div>
        </>
    )
}

export default NavbarLogin;

