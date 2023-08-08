import "./petlist.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import PetDatatable from "../../../components/datatable/PetDatable";
import { useLocation } from "react-router-dom";

const PetList = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  return (
    <div className="list">
      <Sidebar role={role} />
      <div className="listContainer">
        <Navbar />
        <PetDatatable />
      </div>
    </div>
  );
};

export default PetList;
