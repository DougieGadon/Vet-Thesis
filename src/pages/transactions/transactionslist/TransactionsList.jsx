import "./transactionslist.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import TransactionDatatable from "../../../components/datatable/TransactionDatable";
import { useLocation } from "react-router-dom";

const TransactionsList = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  return (
    <div className="list">
      <Sidebar role={role} />
      <div className="listContainer">
        <Navbar />
        <TransactionDatatable />
      </div>
    </div>
  );
};

export default TransactionsList;
