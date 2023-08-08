import "./productnew.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProductNew = ({ inputs, title }) => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const [data, setData] = useState({});
  const [productCode, setProductCode] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "productcode") {
      setProductCode(value);
    }

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    console.log("ProductCode", productCode);
    e.preventDefault();
    try {
      await setDoc(doc(db, "products", productCode), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      // await addDocumentToCollection("products", , userData);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar role={role} />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}

              <div className="formButton">
                <button type="submit">Confirm Create Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
