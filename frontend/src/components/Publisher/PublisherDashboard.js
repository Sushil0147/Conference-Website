import { React, useEffect } from 'react';
import Navbar from '../Landing/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import DomainName from '../Landing/DomainList';



const PublisherDashboard = () => {

    const crn = localStorage.getItem("crn");

    const navigate = useNavigate();

    const [publisherData,setPublisherData] = useState([]);

    const [data, setData] = useState([]);

    const [domain, setDomain] = useState('');



    useEffect(() => {
        axios.get('http://localhost:5000/publisher/dashboard', { withCredentials: true })
            .then((res) => {
                setData(res.data.applicantData);
                setPublisherData(res.data.publisherData)
                // console.log(res.data.publisherData);
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            })
    }, []);


    // filter based on domain
    let result;

    (domain === "" || domain === "choose domain") ? result = data : result = data.filter((ele) => ele.domain === domain)








    return (<>
        <Navbar userData={publisherData} category="publisher" />
        <div className="container-fluid mt-1 p-4 d-flex align-items-center" style={{ backgroundColor: "#caf0f8" }}>
            <div className="container d-flex flex-column">
                <h1>PB Ref.No.</h1>
                <p className='lead bg-light w-25 text-center'>{crn}</p>
            </div>
            <div className="container h-25 w-75 d-flex justify-content-end ">
                <select className="form-select px-1 form-select-lg mr-4" onChange={(e) => setDomain(e.target.value)} id="selectdomain">
                    <option defaultChecked={true} selected>choose domain</option>
                    {DomainName.map((item) => {
                        return (
                            <option>{item}</option>
                        )
                    })}
                </select>

                <Link to="/publisherdashboard/publishedpaper"> <button className='btn btn-primary btn-lg'>View Published paper</button> </Link>
            </div>
        </div>

        <div className='contaner-fluid p-5 mt-1' style={{ backgroundColor: "#caf0f8", height: "100vh" }} >

            <table className="table table-striped " style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>


                <thead>
                    <tr>
                        <th scope="col">Sr No.</th>
                        <th scope="col">Domain</th>
                        <th scope="col">ARN</th>
                        <th scope="col">CRN</th>
                        <th scope="col">Paper Name</th>
                        <th scope="col">Submission date</th>
                        <th scope="col">Final Verdict</th>
                    </tr>
                </thead>
                <tbody>
                    {result ? result.map((item, index) => {

                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.domain}</td>
                                <td>{item.application_no}</td>
                                <td>{item.crn}</td>
                                <td>{item.title}</td>
                                <td>{item.date}</td>
                                <td><Link to="/publisherdashboard/verdictstage" onClick={(e) => localStorage.setItem("arn", item.application_no)} >Review</Link></td>
                            </tr>
                        )
                    }) : (
                        <tr key={1}>
                            <td>No Data found</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>

        </div>
    </>);
}


export default PublisherDashboard;