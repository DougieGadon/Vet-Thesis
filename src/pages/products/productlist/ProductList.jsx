import "./productlist.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ProductDatatable from "../../../components/datatable/ProductDatable";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  return (
    <div className="list">
      <Sidebar role={role} />
      <div className="listContainer">
        <Navbar />
        <ProductDatatable />
      </div>
    </div>
  );
};

export default ProductList;
