import "./appointmentsingle.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";
import { useLocation } from "react-router-dom";

const AppointmentSingle = () => {
  const { appointmentId } = useParams();
  const [apppointment, setAppointment] = useState({});

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  useEffect(() => {
    (async () => {
      try {
        const appointmentData = await getSpecificDocumentFromCollection(
          "appointments",
          appointmentId
        );
        setAppointment(appointmentData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="single">
      <Sidebar role={role} />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Appointments</h1>
                <div className="detailItem">
                  <span className="itemKey">Doctor Name:</span>
                  <span className="itemValue">{apppointment.doctorname}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pet Name:</span>
                  <span className="itemValue">
                    {apppointment.date_appointment}
                  </span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date of Appointment:</span>
                  <span className="itemValue">
                    {apppointment.date_appointment}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Time of Appoitnment:</span>
                  <span className="itemValue">
                    {apppointment.time_appointment}
                  </span>
                  <span className="itemValue"></span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default AppointmentSingle;
