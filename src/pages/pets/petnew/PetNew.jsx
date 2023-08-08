import "./petnew.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const PetNew = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
    console.log("Data", data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const petId = uuidv4();
      await setDoc(doc(db, "pets", petId), {
        ...data,
        timeStamp: serverTimestamp(),
        userId: currentUser.uid,
        id: petId,
      });
      console.log("Data2", data);
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
              <div className="formInput">
                <label>Pet Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Skittle"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Pet Breed</label>
                <input
                  id="breed"
                  type="text"
                  placeholder="Mini Poodle"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Birthday</label>
                <input
                  id="birthday"
                  type="date"
                  placeholder="04/20/2005"
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Wight in Kg</label>
                <input
                  id="weight"
                  type="number"
                  placeholder="10.00"
                  min="0"
                  step="0.01"
                  onChange={handleInput}
                />
              </div>

              <div className="formButton">
                <button type="submit">Confirm Create Pet</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetNew;
