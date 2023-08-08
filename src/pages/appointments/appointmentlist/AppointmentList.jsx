import "./appointmentlist.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import AppointmentDatatable from "../../../components/datatable/AppointmentDatable";
import { useLocation } from "react-router-dom";

const AppointmentList = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  return (
    <div className="list">
      <Sidebar role={role} />
      <div className="listContainer">
        <Navbar />
        <AppointmentDatatable />
      </div>
    </div>
  );
};

export default AppointmentList;
