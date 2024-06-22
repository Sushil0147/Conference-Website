import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUserDetail, IsLoggedIn } from '../../auth.js/authentication';
import axios from 'axios';
import Profile from './Profile';


const Navbar = (props) => {

    // const data = props.userData;
    const navigate = useNavigate();

    const [login, setLogin] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:5000/user/auth", {
          withCredentials: true,
        })
        .then((response)=>{
           if(response.data==="success"){
            console.log(response.data);
             setLogin(true);
           }
        }).catch(err=>console.log(err));
    },[])

   
   
    const handleLogout = () => {
        axios.get("http://localhost:5000/user/logout", {
          withCredentials: true,
        })
        .then((response)=>{
        //    console.log(response.data)
        //    if(response.data ==="success"){
        //     // setLogin(false);
        //     // navigate("/");
        //    }
        }).catch((err)=>{
            // console.log(err);
            setLogin(false);
            navigate("/");
        })
      };

    return (
        <>
            <nav className="navbar navbar-expand-lg  py-2" style={{ backgroundColor: "#168aad" }}>
                <div className="container-fluid ">
                    <Link className="navbar-toggler" type="Link" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </Link>
                    <div className='col-2'>
                        <h2 className='lead fw-bolder fs-2 text-light' style={{ textShadow: "-1px -1px 1px #111, 2px 2px 1px #363636" }}>C<i className='fw-medium'>360</i>C</h2>
                    </div>
                    <div className="collapse d-flex justify-content-between navbar-collapse" id="navbarTogglerDemo03">
                        <form className="d-flex justify-content-evenly w-100" role="search">
                            <input className="form-control  w-50" type="search" placeholder="Search" aria-label="Search" style={{ boxShadow: " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset " }} />


                            {login ? (

                                <div className="col-2 d-flex  ">
                                    <Link to={`/profile/${props.category}`} className="nav-link d-flex flex-column justify-content-center align-items-center text-white mx-4"><i className="fa-solid fa-user "></i></Link>
                                    <button className="text-dark text-decoration-none btn btn-light" id="login" style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} onClick={handleLogout}>Logout</button>
                                </div>
                            ) : (

                                <div className="col-1 d-flex  ">
                                    <Link to={"/register"} type="Link" className="text-dark text-decoration-none btn btn-light " style={{ margin: "0px 10px 0px 10px", align: "right", boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} id="register">Register</Link>
                                    <Link to={"/login"} type="Link" className="text-dark text-decoration-none btn btn-light " id="login" style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} >Login</Link>
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand py-0 px-4 border-top" style={{ backgroundColor: "#168aad" }} >
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav " >
                        <li className="nav-item">
                            <Link className="nav-link active text-light " aria-current="page" to={"/books"} >Books</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to={"/conferences"}>Conferences</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Journals</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav className="navbar navbar-expand py-0 px-2  border-top" style={{ backgroundColor: "#168aad" }} >
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav w-100 d-flex align-items-center justify-content-center" >
                        <li className="nav-item">
                            <Link className="nav-link  text-light text-decoration-none " to={"/books"} >Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to={"/conferences"}>Health</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Mathematics</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Engineering</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Physical</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Social Science</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Education</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Regional</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Law</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Regional</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active text-light" to={"/journals"} >Studies</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;