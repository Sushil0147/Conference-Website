import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Ripple, initMDB } from "mdb-ui-kit";
import DomainName from './DomainList';



const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [domain, setDomain] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const validation = () => {
        let result = true;

        if (name === '' || name === null) {
            result = false;
            toast.error("please enter name");
        }
        else if (email === '' || email === null) {
            result = false;
            toast.error("please enter email");
        }
        else if (category === '' || category === null || category == 'Choose Category') {
            result = false;
            toast.error("Choose Category");
        }
        else if (category === "Reviewer" && (domain === '' || domain === null || domain == 'Choose Domain')) {
            result = false;
            toast.error("Choose domain");
        }
        else if (password === '' || password === null) {
            result = false;
            toast.error("please enter password");
        }
        return result;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (validation()) {
            const baseurl = 'http://localhost:5000/user'
            axios.post(`${baseurl}/register`, { name, email, category, domain, password })
                .then(result => {
                    console.log(result)
                    if (result.data === "already") {
                        toast.error("user already exist")
                    }
                    else if (result.data === "Success") {
                        toast.success("Registration successful");
                        navigate('/login')
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (

        <>
            <div className='container-fluid d-flex justify-content-center' style={{ backgroundColor: "#168aad", height: '100vh' }}>

                <div className='container m-5 w-25 py-2  bg-light d-flex flex-column align-items-center' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>


                    <h4 className="mb-3 fs-1 " style={{ color: "#168aad" }}>Register</h4>
                    <form className="needs-validation " method="post" onSubmit={handleSubmit} >
                        <div className="row g-3 d-flex flex-column align-items-center justify-content-center">



                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Name</label>
                                <div className="input-group has-validation">
                                    <input type="text" className="form-control" id="name" placeholder='name'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select className="form-select" id="category" required="" onChange={(e) => setCategory(e.target.value)}>

                                    <option defaultValue>Choose Category</option>
                                    <option>Applicant</option>
                                    <option>Reviewer</option>
                                    <option>Admin</option>

                                </select>
                            </div>


                            {category == "Reviewer" && (
                                <div className="col-12">
                                    <label htmlFor="category" className="form-label">Domain</label>
                                    <select className="form-select" id="category" required="" onChange={(e) => setDomain(e.target.value)} >

                                        <option selected>Choose Domain</option>
                                        {DomainName.map((ele) => {
                                            return (
                                                <option>{ele}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            )}


                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Enter Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="my-3" />

                        <button className="w-100 btn btn-primary btn-lg mt-2" type="submit" style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Register</button>
                        <div className='d-flex my-2 justify-content-center'>
                            <Link className="" to={"/login"} >All ready have an account</Link>
                        </div>
                    </form>


                </div>
            </div>
        </>
    );
}

export default Register;