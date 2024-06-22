import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import BarChart from "./charts/BarChart";
import BarChartGrp from "./charts/BarChartGrp";
import Funnel from "./charts/funnel";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import Calendar from "./charts/Calendar";
import Navbar from "../Landing/Navbar";
import axios from 'axios';


const AdminMisDash = () => {
  const state = useLocation().state;
  
  // console.log(state.calendar)
  const [align, setAlign] = useState(true);
  const adName =state? state.adminName:"";
  // console.log(state.calendar)

  const [adminData , setAdminData] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:5000/admin/misAuth",{withCredentials:true})
    .then((response)=>{
        setAdminData(response.data.adminData);
    })
    .catch((err)=>{
      console.log(err);
      navigate("/");
    })
  },[])


  return state !== null ? (
    <>
      <Navbar extras={false} userData={adminData} category="admin" />
      <div className="container-fluid my-4 px-2 vh-100">
        <div className="row h-50 mt-1 mb-lg-2 justify-content-center mx-1 ">
          <div
            className="col-lg-7 bg-light bg-gradient rounded-3 shadow-lg mx-3"
            onClick={(e) => setAlign(!align)}
          >
            <p className="lead text-center fw-bold">Paper Status Overview by Domain</p>
            <div style={{ width: "100%", height: "85%" }}>
              {align ? (
                <BarChart data={state.bar} />
              ) : (
                <BarChartGrp data={state.bar}></BarChartGrp>
              )}
            </div>
          </div>
          <div className="col-lg-4 bg-light bg-gradient  rounded-3 shadow-lg mx-3">
            <p className="lead text-center fw-bold">Conference Record Funnel Analysis</p>
            <div style={{ width: "100%", height: "85%" }}>
              <Funnel data={state.funnel} />
            </div>
          </div>
        </div>

        <div className="row h-50 justify-content-center mx-1">
          <div className="col-lg-5 bg-light bg-gradient rounded-3 shadow-lg mx-3 ">
            <p className="lead text-center fw-bold">Reviewers per Domain</p>
            <div style={{ width: "100%", height: "85%" }}>
              <PieChart data={state.pie} />
            </div>
          </div>
          <div className="col-lg-5 bg-light bg-gradient rounded-3 shadow-lg mx-3">
            <p className="lead text-center fw-bold">Distribution of Papers Across Domains</p>
            <div style={{ width: "100%", height: "85%" }}>
              <LineChart data={state.line} />
            </div>
          </div>
        </div>
      </div>
      <div className="row h-30 justify-content-center mx-3 mb-3 ">
        <div className="col bg-light bg-gradient rounded-5 shadow-lg">
          <p className="lead text-center fw-bold mb-0 mt-2">Submission Calendar</p>
          <div style={{ width: "100%", height: "85%" }}>
            <Calendar data={state.calendar} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};
export default AdminMisDash;
