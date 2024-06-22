import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DomainName from '../Landing/DomainList';


const ApplyConferences = () => {

    const navigate = useNavigate();
    const [crn ,setCrn] = useState([]);

    useEffect(() => {
        const baseurl = 'http://localhost:5000'
        axios.get(`${baseurl}/applicant/applyconference`, { withCredentials: true })
            .then((response)=>{
                setCrn(response.data.crn);
            })
            .catch((err) => {
                console.log(err);
                navigate("/login");
            })
    }, []);


    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [abstract, setAbstract] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("crn", crn);
        formData.append("title", title);
        formData.append("author", author);
        formData.append("email", email);
        formData.append("domain", domain);
        formData.append("abstract", abstract);
        formData.append("file", file);

        const validation = () => {
            let result = true;

            if (title === '' || title === null) {
                result = false;
                toast.error("please enter title");
            }
            else if (author === '' || author === null) {
                result = false;
                toast.error("please enter author name");
            }
            else if (email === '' || email === null) {
                result = false;
                toast.error("please enter email");
            }
            else if (domain === '' || domain === null || domain === 'Select domain') {
                result = false;
                toast.error("choose domain");
            }
            else if (abstract === '' || abstract === null) {
                result = false;
                toast.error("please write description of your conference");
            }
            else if (file === null || file.length < 1) {
                result = false;
                toast.error("upload your conference paper");
            }
            else if(file.size / (1024*1024) > 1){
                console.log(file.size);
                result = false;
                toast.error("File with maximum size of 1MB is allowed");
            }
            return result;
        }

        try {
            if (validation()) {

                const baseurl = 'http://localhost:5000'
                const result = axios.post(`${baseurl}/applicant/applyconference`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" }
                    },
                    { withCredentials: true }
                )

                if ((await result).data === "success") {
                    toast.success("applied Successfully and email has been sent to you.")
                    navigate("/user/applyconferences/thankyoupage")
                }
                // else {
                //     toast.error((await result).data)
                // }
                console.log(result);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <div className="modal modal-sheet position-static d-block  p-4 py-md-5" tabIndex="-1" role="dialog" id="modalSheet" style={{ backgroundColor: "#168aad", height: "100vh" }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-bottom-0">
                            <h1 className="modal-title fs-5" style={{ color: "#168aad" }}>apply for conference...</h1>
                            <Link aria-label="Close" to={'/user'}><i className="fa-solid fa-xmark fa-2x"></i></Link>
                        </div>
                        <div className="modal-body py-0">
                            <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="col-12">
                                    <label className="visually-hidden">CRN</label>
                                    <div className="input-group">
                                        <div className="input-group-text">CRN</div>
                                        <input type="text" className="form-control" placeholder={crn} id="crn" readOnly />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="visually-hidden">Title</label>
                                    <div className="input-group">
                                        <div className="input-group-text">Title</div>
                                        <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" placeholder="Paper title" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="visually-hidden">Author</label>
                                    <div className="input-group">
                                        <div className="input-group-text">Author</div>
                                        <input type="text" onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" placeholder="Author names" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="visually-hidden">Email</label>
                                    <div className="input-group">
                                        <div className="input-group-text">Email</div>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Email" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="input-group mb-3">
                                        <label className="input-group-text">Domain</label>

                                        <select className="form-select" onChange={(e) => setDomain(e.target.value)} id="category" required="">

                                            <option defaultValue>Select domain</option>
                                            <option>Healthcare</option>
                                            <option>Technology</option>
                                            <option>Cloud</option>
                                            <option>Banking</option>
                                            <option>Machine Learning</option>
                                            <option>Robotics</option>
                                            {/* {DomainName.map((item)=>{
                                                <option selected>Select domain</option>
                                               return (
                                                <option >{item}</option>
                                               )
                                            })} */}

                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="visually-hidden">Abstract</label>
                                    <div className="input-group">
                                        <div className="input-group-text">Abstract</div>
                                        <textarea onChange={(e) => setAbstract(e.target.value)} className="form-control" rows="3" id="abstract"></textarea>
                                    </div>
                                </div>
                                <div className="col-12 mb-4 mt-0">

                                    <label className="form-label mx-2 ">Upload Paper</label>
                                    <input onChange={(e) => setFile(e.target.files[0])} className="form-control" name="file" type="file" id="uploadpaper" accept='application' />

                                </div>



                                <div className="col-12 mt-2">
                                    <button type="submit" className="btn btn-primary" style={{ boxShadow: "rgba(0,0,0,0.4) 0px 2px 4px ,rgba(0,0,0,0.3) 0px 7px 13px -3px,rgba(0,0,0,0.2) 0px -3px 0px inset" }}>Submit</button>
                                </div>
                            </form>


                            {/* <p>This is a modal sheet, a variation of the modal that docs itself to the bottom of the viewport like the newer share sheets in iOS.</p> */}
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}


export default ApplyConferences;