import "./productsingle.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";
import { useLocation } from "react-router-dom";

const ProductSingle = () => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const productData = await getSpecificDocumentFromCollection(
          "products",
          productId
        );
        setProduct(productData);
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
                <h1 className="itemTitle">Products</h1>
                <div className="detailItem">
                  <span className="itemKey">Product Code:</span>
                  <span className="itemValue">{product.productcode}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Product Name:</span>
                  <span className="itemValue">{product.productname}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Product Description:</span>
                  <span className="itemValue">{product.description}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Stock:</span>
                  <span className="itemValue">{product.stock}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{product.price}</span>
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

export default ProductSingle;
