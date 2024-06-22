import React, { useEffect, useState } from 'react'
import Country from './CountryAPI.json';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import { toast } from 'react-toastify';
import "react-country-state-city/dist/react-country-state-city.css";

export default function UpdateProfile() {

    const [data, setData] = useState([]);
    const [profileData, setProfileData] = useState([]);
    const category = useLocation().state;
    let flag = false;

    const handleProfileAPI = async() => {
        
        await axios.post("http://localhost:5000/user/profile", { category }, { withCredentials: true })
            .then((response) => {
                setData(response.data);
                // console.log(response.data);
                if (response.data.profiledetails) {
                    setProfileData(response.data.profiledetails[0]);
                    setPhone(response.data.profiledetails[0].phone);
                    setAddress(response.data.profiledetails[0].address);
                    setGender(response.data.profiledetails[0].gender);
                    setFile(response.data.profiledetails[0].file);
                    setCountryId(response.data.profiledetails[0].countryid);
                    setStateId(response.data.profiledetails[0].stateid);
                    setZip(response.data.profiledetails[0].zip);
                    setAboutMe(response.data.profiledetails[0].aboutme);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        handleProfileAPI();
    }, [])

    const crn = data.crn;
    const navigate = useNavigate();


    const p = profileData.phone;
    console.log("phone number",p);

    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [gender, setGender] = useState("");
    const [file, setFile] = useState(null);
    const [countryid, setCountryId] = useState(0);
    const [stateid, setStateId] = useState(0);
    const [zip, setZip] = useState();
    const [aboutme, setAboutMe] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("category", category);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("gender", gender);
        formData.append("countryid", countryid);
        formData.append("stateid", stateid);
        formData.append("zip", zip);
        formData.append("aboutme", aboutme);
        formData.append("file", file);

        axios.post('http://localhost:5000/user/updateprofile',
            formData,
            { withCredentials: true },
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
            .then((res) => {
                if (res.data === "success") {
                    toast.success("profile updated successfully");
                    e.target.reset();
                    navigate(`/profile/${category}`)
                }
            })
            .catch((err) => {
                navigate("/");
            })
    }


    return (
        <>
            <div className='container-fluid d-flex flex-column  align-items-center justify-content-center py-5' style={{ backgroundColor: "#168aad" }}>
                <h4 className="mb-3 fw-bolder fs-2 text-white">Profile</h4>
                <div className="col-md-7 col-lg-8 bg-white p-5">
                    <form className="needs-validation" onSubmit={handleSubmit} encType='multipart/form-data'>

                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label for="Name" className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" id="Name" value={data.name} readOnly />
                            </div>
                            <div className="col-sm-6">
                                <label for="phone" className="form-label fw-bold">Phone number</label>
                                <input type="number" className="form-control" id="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />

                            </div>
                            <div className="col-12">
                                <label for="email" className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" id="email" value={data.email} readOnly />
                            </div>

                            <div className="col-12">
                                <label for="address" className="form-label fw-bold">Address</label>
                                <input type="text" className="form-control" id="address" onChange={(e) => setAddress(e.target.value)} value={address} />
                            </div>
                            <hr className="my-4" />

                            <div className="col-md-5">
                                <label for="country" className="form-label fw-bold">Country</label>
                                <CountrySelect
                                    onChange={(e) => {
                                        setCountryId(e.id);
                                    }}
                                    placeHolder="Select Country"
                                />
                            </div>

                            <div className="col-md-4">
                                <label for="state" className="form-label fw-bold">State</label>
                                <StateSelect
                                    countryid={countryid}
                                    onChange={(e) => {
                                        setStateId(e.id);
                                    }}
                                    placeHolder="Select State"
                                />
                            </div>

                            <div className="col-md-3">
                                <label for="zip" className="form-label fw-bold">Zip</label>
                                <input type="text" className="form-control" onChange={(e) => setZip(e.target.value)} id="zip" value={zip} />
                            </div>
                        </div>

                        <hr className="my-4" />

                        <label className="form-label fw-bold">Gender</label>

                        <div className="my-3" onChange={(e) => setGender(e.target.value)} >
                            <div className="form-check">
                                <input id="male" name="genderMethod" type="radio" value="Male" className="form-check-input" />
                                <label className="form-check-label" for="male">Male</label>
                            </div>
                            <div className="form-check">
                                <input id="female" name="genderMethod" type="radio" value="Female" className="form-check-input" />
                                <label className="form-check-label" for="female">Female</label>
                            </div>
                            <div className="form-check">
                                <input id="others" name="genderMethod" type="radio" value="Others" className="form-check-input" />
                                <label className="form-check-label" for="others">Others</label>
                            </div>
                        </div>

                        <hr className="my-4" />
                        <div className="row g-3 my-2">
                            <div className="col-4">
                                <label className="form-label mx-2 ">Upload Photo</label>
                                <input onChange={(e) => setFile(e.target.files[0])}  className="form-control" name="file" type="file" id="uploadpaper" accept='application' />
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="row g-3 my-2">
                            <div className="col-12">
                                <label for="about" className="form-label fw-bold">About You</label>
                                <textarea className="form-control" onChange={(e) => setAboutMe(e.target.value)} value={aboutme} id="about" rows={6}  />

                            </div>
                        </div>

                        <hr className="my-4" />
                        <div className="container d-flex align-items-center justify-content-end">
                            <button className=" btn btn-primary btn-lg" type="submit" style={{ boxShadow: " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

