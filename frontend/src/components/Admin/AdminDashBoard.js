import React from "react";
// import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../Landing/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DomainName from "../Landing/DomainList";
const AdminDashBoard = () => {
    const baseurl = "http://localhost:5000";
    const [category, setCategory] = useState("crn");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(5);
    const [data, setData] = useState([]);
    const [cat, setCat] = useState("crn");
    const [inp, setInp] = useState("");
    const [sts, setSts] = useState(5);
    const [showAll, setshowAll] = useState(false);
    const [showRecord, setshowRecord] = useState(false);
    const [val, setval] = useState();
    const [userHide, setuserHide] = useState(true);
    const [reviewerHide, setreviewerHide] = useState(true);
    const [publisherHide, setpublisherHide] = useState(true);
    const ARN = localStorage.getItem("crn");
    const adminName = localStorage.getItem("admin");
    const navigate = useNavigate();
    // mis
    const [bardata, setbarData] = useState([]);
    const [funneldata, setfunnelData] = useState([]);
    const [piedata, setpieData] = useState([]);
    const [linedata, setlineData] = useState([]);
    const [calendardata, setCalendarData] = useState([]);

    const [adminData,SetAdminData] = useState([]);

    var adName = "Admin";
    if (adminName) {
        adName = (
            adminName.split(" ")[0][0] + adminName.split(" ")[1][0]
        ).toUpperCase();
    }
    const url = useRef("nothing");
    const refresh = () => {
        setCategory("crn");
        setSearch("");
        setStatus(5);
        setData([]);
        setshowRecord(false);
        setuserHide(true);
        setreviewerHide(true);
        setpublisherHide(true);
    };
    useEffect(() => {
        axios.get("http://localhost:5000/admin/auth",{withCredentials:true})
        .then((response)=>{
            SetAdminData(response.data.adminData);
            if (val === "1") {
                url.current = "applicantinfo";
                refresh();
                setuserHide(false);
            } else if (val === "2") {
                url.current = "reviewerinfo";
                refresh();
                setreviewerHide(false);
            } else if (val === "3") {
                url.current = "publisherinfo";
                refresh();
                setpublisherHide(false);
            } else {
                refresh();
            }
        })
        .catch((err)=>{
            console.log(err);
            navigate("/");
        })
    }, [val]);

    const handleSubmit = () => {
        if (category === "none") {
            setCat(category);
            setSts(status);
        } else {
            if (search === "") {
                toast.info("Please Enter search value !");
            } else {
                setCat(category);
                setInp(search);
                setSts(status);
                setshowAll(!showAll);
            }
        }
    };

    const excelDownload = (e) => {
        axios
            .get(`${baseurl}/admin/${url.current}`)
            .then((result) => {
                if (result.data.sts === "success") {
                    toast.success("File Successfully created ");
                } else {
                    toast.error(result.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .post(`${baseurl}/admin/${url.current}`, { cat, inp, sts })
            .then((result) => {
                if (result.data.length !== 0) {
                    setshowRecord(true);
                    setData(result.data);
                } else {
                    setshowRecord(false);
                }
            })
            .catch((err) => console.log("Error while rendering..."));
    }, [cat, inp, sts, showAll]);

    const handleAll = () => {
        if (!userHide) {
            setCategory("none");
            setStatus(5);
        }
        axios
            .get(`${baseurl}/admin/${url.current}`)
            .then((result) => {
                if (result.data.all.length !== 0) {
                    setshowRecord(true);
                    setData(result.data.all);
                } else {
                    setshowRecord(false);
                }
                console.log(data);
            })
            .catch((err) => console.log("Error while rendering..."));
    };
    // for MIS
    const handleMIS = (e) => {
        navigate("/admin/mis", { state: { adminName: adName, bar: bardata, funnel: funneldata, pie: piedata, line: linedata, calendar: calendardata } });
    }
    const ibardata = DomainName.map((ele) => {
        return { Domain: ele, Inprogress: 0, Published: 0, Rejected: 0 };
    });
    const funnelList = [
        "received",
        "peer_reviewed",
        "camera_reviewed",
        "presentation_reviewed",
        "published",
    ];
    const ifunneldata = funnelList.map((ele) => {
        return { id: ele, value: 0, label: "Papers " + ele };
    });

    const ipiedata = DomainName.map((ele) => {
        return { id: ele, label: ele, value: 1 };
    });
    const ilinedata = [{
        "id": "Papers",
        "color": "hsl(360, 70%, 50%)",
        "data": DomainName.map((ele) => {
            return { "x": ele, "y": 1 }
        })
    }, {
        "id": "Reviewers",
        "color": "hsl(201, 70%, 50%)",
        "data": DomainName.map((ele) => {
            return { "x": ele, "y": 1 }
        })
    }]

    useEffect(() => {
        axios.post(`${baseurl}/admin/newdash/bar`).then((res) => {
            for (let i = 0; i < DomainName.length; i++) {
                ibardata[i].Inprogress = res.data.inpro[i];
                ibardata[i].Published = res.data.publish[i];
                ibardata[i].Rejected = res.data.reject[i];
            }
            setbarData(ibardata);
        });
        axios.post(`${baseurl}/admin/newdash/funnel`).then((res) => {
            res.data.map((ele, i) => (ifunneldata[i].value = ele));
            setfunnelData(ifunneldata);
        });
        axios.post(`${baseurl}/admin/newdash/pie`).then((res) => {
            res.data.map((ele, i) => (ipiedata[i].value = ele));
            setpieData(ipiedata);
            res.data.map((ele, i) => (ilinedata[1]).data[i].y = ele)
            setlineData(ilinedata);
        });
        axios.post(`${baseurl}/admin/newdash/line`).then((res) => {
            res.data.map((ele, i) => (ilinedata[0]).data[i].y = ele)
            setlineData(ilinedata);
        });

        axios.post(`${baseurl}/admin/newdash/calendar`).then((res) => {
            
            const  data = res.data.map((ele)=>{
                return ({"date":ele.date.slice(0,10)})
            })
            
            let dateObj = Object.groupBy(data, ({ date }) => date);
            Object.keys(dateObj).forEach((key, i) => {
                dateObj[key] = dateObj[key].length;
            })
            const icalendardata = Object.entries(dateObj).map(([key, value]) => {
                return ({ "value": value, "day": key })
            })
            setCalendarData(icalendardata);
        });
    }, []);

    return (
        <>
            <Navbar userData={adminData} category="admin"  />
            <div
                className="container-fluid  border d-flex align-items-center "
                style={{ backgroundColor: "#caf0f8" }}
            >
                <div className="col-lg-9">
                    <h5 className=" w-25 text-center mt-1">AdRN</h5>
                    <p className=" bg-light w-25 text-center">{ARN}</p>
                </div>
                <div className="col-lg-2 ">
                    <select
                        className="form-select"
                        defaultValue={0}
                        value={val}
                        onChange={(e) => {
                            setval(e.target.value);
                        }}
                        id="category"
                        required=""
                    >
                        <option value="0" disabled defaultValue>
                            View By Category
                        </option>
                        <option value="1">Applicant</option>
                        <option value="2">Reviewer</option>
                        <option value="3">Publisher</option>
                    </select>
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                    <button className="btn btn-primary rounded-3 shadow" onClick={handleMIS}>MIS</button>
                </div>
            </div>

            {/* Applicant DashBoard  */}
            <div className=" mt-1  text-center" hidden={userHide}>
                <div
                    className="container-fluid d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#caf0f8", height: "15vh" }}
                >
                    <div className="container">
                        <h4 className="text-dark d-block">Search by Applicant details</h4>
                    </div>
                    <div className="col d-flex align-items-center">
                        <label className="">Search By :</label>
                        <select
                            className="p-1 ml-1"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                            }}
                        >
                            <option value="none">None</option>
                            <option value="crn">CRN</option>
                            <option value="application_no">Application No</option>
                            <option value="email">Email</option>
                            <option value="domain">Domain</option>
                            <option value="date">Date</option>
                        </select>
                        {category !== "none" ? (
                            category === "domain" ? (
                                <select
                                    className="p-1 ml-2"
                                    onChange={(e) => setSearch(e.target.value)}
                                >
                                    <option defaultChecked={true}>Choose Domain</option>

                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Cloud">Cloud</option>
                                    <option value="Banking">Banking</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                    <option value="Robotics">Robotics</option>
                                </select>
                            ) : (
                                <input
                                    className="p-1 ml-2"
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={`Enter the ${category}`}
                                />
                            )
                        ) : (
                            <input
                                className="p-1 ml-2"
                                type="text"
                                value=""
                                placeholder={`Showing all`}
                                readOnly
                            />
                        )}
                        <label className="ml-3">Status:</label>
                        <select
                            className="py-1 my-2 ml-3"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value={5}>All</option>
                            <option value={4}>Accepted</option>
                            <option value={0}>In Progress</option>
                            <option value={-1}>Rejected</option>
                        </select>
                        <button
                            className="btn-primary btn col-1 mx-5"
                            onClick={(e) => handleSubmit()}
                        >
                            Search
                        </button>
                        <button className="btn-primary btn col-2 mx-1" onClick={handleAll}>
                            Show All
                        </button>
                        <Link
                            style={{ position: "absolute", right: "25px" }}
                            to="http://localhost:5000/conferenceData/Conference_Data.xlsx"
                            download="Conference papers"
                            target="_blank"
                        >
                            <button className="btn btn-primary" onClick={excelDownload}>
                                Download Excel
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {showRecord ? (
                        <table
                        className="table-striped table-hover"
                        style={{ width: "99vw" }}
                      >
                        <thead>
                          <tr>
                            <th>S. No.</th>
                            <th>CRN</th>
                            <th>Application No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Email</th>
                            <th>Domain</th>
                            <th>Abstract</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((info, i) => {
                            var sts = "";
                            switch (info.status_code) {
                              case -1: {
                                sts = "Rejected";
                                break;
                              }
                              case 4: {
                                sts = "Accepted";
                                break;
                              }
                              default: {
                                sts = "In Progress";
                              }
                            }
                            return (
                              <tr key={i}>
                                <td className="text-center fw-bold">{i+1}</td>
                                <td>{info.crn}</td>
                                <td>{info.application_no}</td>
                                <td>{info.title}</td>
                                <td>{info.author}</td>
                                <td>{info.email}</td>
                                <td>{info.domain}</td>
                                <td>{info.abstract}</td>
                                <td>{sts}</td>
                                <td>{info.date}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "80vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>No Record Found</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviewer DashBoard  */}
            <div className=" mt-1  text-center" hidden={reviewerHide}>
                <div
                    className="container-fluid d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#caf0f8", height: "15vh" }}
                >
                    <div className="container">
                        <h4 className="text-dark d-block">Search by Reviewer details</h4>
                    </div>
                    <div className="col d-flex align-items-center">
                        <label className="">Search By :</label>
                        <select
                            className="p-1 ml-1"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                            }}
                        >
                            <option value="crn">RRN</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                            <option value="domain">Domain</option>
                        </select>
                        {category === "domain" ? (
                            <select
                                className="p-1 ml-2"
                                onChange={(e) => setSearch(e.target.value)}
                            >
                                <option value="Choose Domain" defaultChecked={true} disabled>
                                    Choose Domain
                                </option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Technology">Technology</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Banking">Banking</option>
                                <option value="Machine Learning">Machine Learning</option>
                                <option value="Robotics">Robotics</option>
                            </select>
                        ) : (
                            <input
                                className="p-1 ml-2"
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={`Enter the ${category}`}
                            />
                        )}
                        <button
                            className="btn-primary btn col-1 mx-5"
                            onClick={(e) => handleSubmit()}
                        >
                            Search
                        </button>
                        <button className="btn-primary btn col-2 mx-1" onClick={handleAll}>
                            Show All
                        </button>
                        <Link
                            style={{ position: "absolute", right: "25px" }}
                            to="http://localhost:5000/reviewerData/Reviewer_Data.xlsx"
                            download="Reviewers info"
                            target="_blank"
                        >
                            <button className="btn btn-primary" onClick={excelDownload}>
                                Download Excel
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {showRecord ? (
                        <table
                            className="table-striped table-hover"
                            style={{ width: "99vw" }}
                        >
                            <thead>
                                <tr>
                                    <th>RRN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Domain</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((info, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{info.crn}</td>
                                            <td>{info.name}</td>
                                            <td>{info.email}</td>
                                            <td>{info.domain}</td>
                                            <td>{info.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "80vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>No Record Found</h1>
                        </div>
                    )}
                </div>
            </div>

            {/* Publisher DashBoard  */}
            <div className=" mt-1  text-center" hidden={publisherHide}>
                <div
                    className="container-fluid d-flex flex-column align-items-center"
                    style={{ backgroundColor: "#caf0f8", height: "15vh" }}
                >
                    <div className="container">
                        <h4 className="text-dark d-block">Search by Publisher details</h4>
                    </div>
                    <div className="col d-flex align-items-center">
                        <label className="">Search By :</label>
                        <select
                            className="p-1 ml-1"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSearch("");
                            }}
                        >
                            <option value="crn">PRN</option>
                            <option value="name">Name</option>
                            <option value="email">Email</option>
                        </select>
                        <input
                            className="p-1 ml-2"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={`Enter the ${category}`}
                        />
                        <button
                            className="btn-primary btn col-1 mx-5"
                            onClick={(e) => handleSubmit()}
                        >
                            Search
                        </button>
                        <button className="btn-primary btn col-2 mx-1" onClick={handleAll}>
                            Show All
                        </button>
                        <Link
                            style={{ position: "absolute", right: "25px" }}
                            to="http://localhost:5000/publisherData/Publisher_Data.xlsx"
                            download="Publishers info"
                            target="_blank"
                        >
                            <button className="btn btn-primary" onClick={excelDownload}>
                                Download Excel
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    {showRecord ? (
                        <table
                            className="table-striped table-hover"
                            style={{ width: "99vw" }}
                        >
                            <thead>
                                <tr>
                                    <th>RRN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((info, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{info.crn}</td>
                                            <td>{info.name}</td>
                                            <td>{info.email}</td>
                                            <td>{info.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "80vh",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <h1>No Record Found</h1>
                        </div>
                    )}
                </div>
            </div>

            {userHide && reviewerHide && publisherHide ? (
                <div
                    style={{
                        width: "100vw",
                        display: "flex",
                        alignItems: "center",
                        height: "60vh",
                        justifyContent: "center",
                    }}
                >
                    <h1 className="">Welcome {adminName} to our Website.</h1>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default AdminDashBoard;
