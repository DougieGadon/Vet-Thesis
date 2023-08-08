import "./serviceupdate.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";
import { db } from "../../../firebase";
import { useLocation } from "react-router-dom";

const ServiceUpdate = ({ inputs, title }) => {
  const { serviceId } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const [service, setService] = useState({});

  useEffect(() => {
    (async () => {
      try {
        console.log("Service ID", serviceId);
        const serviceData = await getSpecificDocumentFromCollection(
          "services",
          serviceId
        );
        setService(serviceData);
        console.log("Service Update", serviceData);
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
      await updateDoc(doc(db, "services", serviceId), {
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
                <label>Service Code</label>
                <input
                  id="servicecode"
                  type="text"
                  placeholder="VAC001"
                  defaultValue={service.servicecode || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Service Name</label>
                <input
                  id="servicename"
                  type="text"
                  placeholder="Vaccine"
                  defaultValue={service.servicename || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="AntiRabies"
                  defaultValue={service.description || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Stock</label>
                <input
                  id="price"
                  type="number"
                  placeholder="1000"
                  defaultValue={service.price || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formButton">
                <button type="submit">Confirm Service Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceUpdate;
