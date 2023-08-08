import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useLocation } from "react-router-dom";

const List = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  return (
    <div className="list">
      <Sidebar role={role} />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default List;
