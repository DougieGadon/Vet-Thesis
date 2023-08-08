import "./servicelist.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ServiceDatatable from "../../../components/datatable/ServiceDatable";
import { useLocation } from "react-router-dom";

const ServiceList = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  return (
    <div className="list">
      <Sidebar role={role} />
      <div className="listContainer">
        <Navbar />
        <ServiceDatatable />
      </div>
    </div>
  );
};

export default ServiceList;
