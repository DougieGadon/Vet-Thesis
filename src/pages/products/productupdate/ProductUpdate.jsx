import "./productupdate.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";
import { db } from "../../../firebase";
import { useLocation } from "react-router-dom";

const ProductUpdate = ({ inputs, title }) => {
  const { productId } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        console.log("Product ID", productId);
        const productData = await getSpecificDocumentFromCollection(
          "products",
          productId
        );
        setProduct(productData);
        console.log("Product Update", productData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(value);
    setData({ ...data, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "products", productId), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="update">
      <Sidebar role={role} />
      <div className="updateContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label>Procuct Code</label>
                <input
                  id="productcode"
                  type="text"
                  placeholder="VAC001"
                  defaultValue={product.productcode || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  id="productname"
                  type="text"
                  placeholder="Vaccine"
                  defaultValue={product.productname || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="AntiRabies"
                  defaultValue={product.description || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Stock</label>
                <input
                  id="stock"
                  type="number"
                  placeholder="1000"
                  defaultValue={product.price || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  id="price"
                  type="number"
                  defaultValue={product.price || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formButton">
                <button type="submit">Confirm Product Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
