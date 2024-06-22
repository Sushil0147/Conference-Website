import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
    
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const validation = () => {
        let result = true;

        if (email === '' || email === null) {
            result = false;
            toast.error("please enter email");
        }
        else if (category === '' || category === null || category=='Choose Category') {
            result = false;
            toast.error("Choose Category");
        }
        else if (password === '' || password === null) {
            result = false;
            toast.error("please enter password");
        }
        return result;
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validation()) {
            const baseurl = 'http://localhost:5000/user'
            axios.post(`${baseurl}/login`, { email, category, password },{withCredentials : true})
                .then(result => {
                    if (result) {
                        if (result.data.status === "Success") {
                            if (category === 'Applicant') {
                                toast.success("Successfully logged in")
                                navigate('/user')
                            }
                            else if (category === 'Reviewer') {
                                toast.success("Successfully logged in")
                                navigate('/reviewerdashboard')
                            } else if (category === 'Publisher') {
                                toast.success("Successfully logged in")
                                localStorage.setItem("crn", result.data.data.crn);
                                navigate('/publisherdashboard')
                            }
                            else {
                                toast.success("Successfully logged in")
                                localStorage.setItem("crn", result.data.data.crn);
                                navigate('/admin')
                            }
                        }
                        else if (result.data === 'passworderror') {
                            toast.error("Password is incorrect");
                        }
                        else {
                            toast.error(result.data);
                        }
                    }
                    else {
                        toast.error(result.data);
                    }
                })
                .catch(err => console.log(err));
        }
    }


    return (

        <>
            <div className='container-fluid d-flex justify-content-center' style={{ backgroundColor: "#168aad", height: '100vh' }}>

                <div className='container m-5 w-25 h-75 bg-light d-flex flex-column align-items-center'>


                    <h4 className="my-3 fs-1 " style={{ color: "#168aad" }}>Login</h4>
                    <form className="needs-validation " onSubmit={handleSubmit}>
                        <div className="row g-3 d-flex flex-column align-items-center justify-content-center">

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Enter email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="you@example.com" />
                            </div>

                            <div className="col-12">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select className="form-select" onChange={(e) => setCategory(e.target.value)} id="category" required="">

                                    <option defaultValue>Choose Category</option>
                                    <option>Applicant</option>
                                    <option>Reviewer</option>
                                    <option>Publisher</option>
                                    <option>Admin</option>

                                </select>

                            </div>

                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="password">Enter password</label>
                                    <input type="password" className="form-control" value={password} id="password" placeholder="Password" 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    autoComplete='off'
                                    />
                                    
                                </div>
                            </div>
                        </div>


                        <hr className="my-3" />

                        <button className="w-100 btn btn-primary btn-lg my-3" style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }} type="submit">Login</button>

                        <div className='d-flex justify-content-center my-0'>

                            <Link className="" to={'/register'} >New User</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;