import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
// https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png


function Profile(props) {

    const [data, setData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const category = useParams().category;

    useEffect(() => {
        axios.post("http://localhost:5000/user/profile", { category }, { withCredentials: true })
            .then((response) => {
                setData(response.data);
                if(response.data.profiledetails){
                    setProfileData(response.data.profiledetails[0]);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center" style={{ backgroundColor: "#168aad", "height": "100vh" }}>
                <div className="container  bg-white  rounded-5">
                    <div className="row  p-3  rounded-3 shadow-lg">
                        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                            <h5 className="display-6 fw-bold lh-1">Personal details</h5>
                            <p className='my-4'>Add your personal details as you would like it to appear on your profile</p>
                            <div className="container  p-4">
                                <div className="row my-2">
                                    <div className="col border-bottom fw-bold">CRN</div>

                                    <div className="col border-bottom">{data.crn}</div>
                                </div>
                                <div className="row my-2">
                                    <div className="col border-bottom fw-bold">Name</div>

                                    <div className="col border-bottom">{data.name}</div>
                                </div>
                                <div className="row my-2">
                                    <div className="col border-bottom fw-bold">Email</div>

                                    <div className="col border-bottom"><Link className='text-decoration-none'>{data.email}</Link></div>
                                </div>
                                <div className="row my-2">
                                    <div className="col border-bottom fw-bold">Phone</div>

                                    <div className="col border-bottom">{ profileData ? profileData.phone : "-"}</div>
                                </div>
                                <div className="row my-2">
                                    <div className="col border-bottom fw-bold">Address</div>

                                    <div className="col border-bottom">{ profileData ? profileData.address : "-"}</div>
                                </div>
                                <div className="row my-2">
                                    <div className="col border-bottom fw-bold">Gender</div>

                                    <div className="col border-bottom">{ profileData ? profileData.gender : "-"}</div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4 mb-lg-3">
                                <Link to={"/updateprofile"} state={category} type="button" className="btn my-3 btn-success btn-lg px-4 me-md-2 fw-bold " style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Update Profile</Link>

                            </div>
                        </div>
                        <div className="col-lg-4 border border-2 border-secondary py-3 offset-lg-1 p-0 overflow-hidden text-center shadow-lg  rounded " >


                            <img className="rounded-lg-3  border  border-1 border-secondary rounded-circle" src={ profileData ? profileData.file : "https://plus.unsplash.com/premium_photo-1688350839154-1a131bccd78a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" width="150" height="150" />

                            <div className="d-md-flex  justify-content-center  align-items-start" >
                                <button type="button" className="btn btn-outline-primary    my-3 fw-bold " style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Change photo</button>
                                <button type="button" className="btn btn-outline-primary  mx-2   my-3 fw-bold " style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Remove photo</button>
                            </div>
                            <div className='container  d-flex flex-column justify-content-center text-center align-items-center '>
                                <p className='fs-4 my-2'>about me</p>
                                <p className='lead'>{ profileData ? profileData.aboutme : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}

export default Profile;