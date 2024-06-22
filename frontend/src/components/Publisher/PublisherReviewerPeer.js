import { React, useState, useEffect } from 'react';
import Navbar from '../Landing/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PublisherReviewerPeer = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const application_no = localStorage.getItem("arn");
    // console.log(application_no);

    useEffect(() => {
        axios.post('http://localhost:5000/publisher/publisherreviewerpeerdata', { application_no },{withCredentials:true})
            .then((res) => {
                setData(res.data[0]);
                // console.log(res.data[0])
            })
            .catch((err)=>{
                console.log(err);
                navigate("/");
            })
    }, []);

    return (

        <>
            <Navbar category="publisher" />
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "#caf0f8" }}>
                <h1 className='mb-3'>Peer Screening</h1>
                <div className='conatiner d-flex px-5 justify-content-evenly align-items-center h-50 text-light flex-column w-50 rounded' style={{ backgroundColor: "#168aad" }}>
                    <div className="container d-flex">
                        <div className="col fw-bolder">Reviewer CRN</div>
                        <div className="col">{data.reviewer_crn}</div>
                    </div>

                    <div className="container d-flex ">
                        <div className="col fw-bolder">Marks</div>
                        <div className="col">{data.marks}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">Comments</div>
                        <div className="col">{data.comments}</div>
                    </div>
                    <div className="container d-flex ">
                        <div className="col fw-bolder">Date</div>
                        <div className="col">{data.date}</div>
                    </div>

                </div>

            </div>
        </>
    );
}


export default PublisherReviewerPeer;
