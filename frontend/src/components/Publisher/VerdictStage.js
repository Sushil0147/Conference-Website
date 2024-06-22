import { React, useState, useEffect } from 'react';
import Navbar from '../Landing/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';



const VerdictStage = () => {

    const navigate = useNavigate();

    const publisher_crn = localStorage.getItem("crn");
    const application_no = localStorage.getItem("arn");

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5000/publisher/conferencedata', { application_no },{withCredentials:true})
            .then((res) => {
                setData(res.data[0]);
                // console.log(res.data[0])
            })
            .catch((err)=>{
                console.log(err);
                navigate("/login");
            })
    }, []);

    const [comments, setComment] = useState('')
    const [status, setStatus] = useState('');


    const validation = () => {
        let result = true;

        if (comments === '' || comments === null) {
            result = false;
            toast.error("please give comment");
        }
        else if (status === '' || status === null) {
            result = false;
            toast.error("select status");
        }
        return result;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validation()) {
            if (data.status != 4) {
                axios.post('http://localhost:5000/publisher/finalreview', { application_no,publisher_crn ,comments,status })
                    .then((res) => {
                        if (res.data === "success") {
                            toast.success("successful");
                            e.target.reset();
                            // navigate('/reviewerdashboard')
                        }
                    })
            }
            else {
                toast.error("already publisher");
                e.target.reset();
            }
        }
    }
    return (
        <>
            <Navbar category="publisher" />
            <div className="container-fluid mt-1 p-2  d-flex align-items-center" style={{ backgroundColor: "#caf0f8" }}>
                <div className="container d-flex flex-column">
                    <h1>PB Ref.No.</h1>
                    <p className='lead'>{publisher_crn}</p>
                </div>
            </div>
            <div className='container-fluid d-flex p-3  mt-1' style={{ backgroundColor: "#caf0f8" }}>
                <div className='conatiner-fluid  d-flex h-50 text-light mt-4 flex-column w-65 rounded' style={{ backgroundColor: "#168aad" }}>
                    <div className="container d-flex my-3">
                        <div className="col fw-bolder">Author name</div>
                        <div className="col">{data.author}</div>
                    </div>
                    <div className="container d-flex my-3">
                        <div className="col fw-bolder">CRN</div>
                        <div className="col">{data.crn}</div>
                    </div>
                    <div className="container d-flex my-3">
                        <div className="col fw-bolder">ARN</div>
                        <div className="col">{data.application_no}</div>
                    </div>
                    <div className="container d-flex my-3">
                        <div className="col fw-bolder">Paper name</div>
                        <div className="col">{data.title}</div>
                    </div>
                    <div className="container d-flex my-3">
                        <div className="col fw-bolder">Domain</div>
                        <div className="col">{data.domain}</div>
                    </div>
                    <div className="container d-flex my-3">
                        <div className="col fw-bolder">Date</div>
                        <div className="col">{data.date}</div>
                    </div>

                </div>
                <div className='container d-flex  flex-column  '>
                    <h3 className='text-end w-50'>Review Progress</h3>
                    <div className='container d-flex justify-content-end '>
                        <table className="table table-striped w-75" style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
                            <thead>
                                <tr>
                                    <th scope="col">Status</th>
                                    <th scope="col">Reviewer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Peer Screening</td>
                                    <td>Recommended <p><Link  to={'/publisherdashboard/verdictstage/publisherreviewerpeer'} className='lead text-decoration-none fs-6'>view here</Link></p></td>
                                </tr>
                                <tr>
                                    <td>Camera Screening</td>
                                    <td>Recommended <p><Link  to={'/publisherdashboard/verdictstage/publisherreviewercamera'} className='lead text-decoration-none fs-6'>view here</Link></p></td>

                                </tr>
                                <tr>
                                    <td>Presentation Screening</td>
                                    <td>Recommended <p><Link  to={'/publisherdashboard/verdictstage/publisherreviewerpresentation'} className='lead text-decoration-none fs-6'>view here</Link></p></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>


                    <form onSubmit={handleSubmit}>
                        <div className='container d-flex flex-column align-items-end '>
                            <h1 className='lead fs-3  mx-2'>Final Approval</h1>
                            <textarea className="form-control w-50 mt-3" onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment here" id="floatingTextarea"></textarea>

                            <div className="form-floating my-3 d-flex">

                                <div className="my-3" onChange={(e) => setStatus(e.target.value)}>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value="Accepted" name="flexRadioDisabled" id="flexRadioDisabled" />
                                        <label className="form-check-label" htmlFor="flexRadioDisabled">
                                            Accepted
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" value="Rejected" name="flexRadioDisabled" id="flexRadioCheckedDisabled"/>
                                        <label className="form-check-label" htmlFor="flexRadioCheckedDisabled">
                                            Rejected
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type='submit' className='btn btn-primary mt-3 btn-md fw-bolder fs-6 ' style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset" }}>Submit</button>

                        </div>
                    </form>

                </div>
            </div>


        </>
    );
}
export default VerdictStage;