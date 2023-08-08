import "./petupdate.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";
import { db } from "../../../firebase";
import { useLocation } from "react-router-dom";

const PetUpdate = ({ inputs, title }) => {
  const { petId } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const [pet, setPet] = useState({});

  useEffect(() => {
    (async () => {
      try {
        console.log("Pet ID", petId);
        const petData = await getSpecificDocumentFromCollection("pets", petId);
        setPet(petData);
        console.log("Pet Update", petData);
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
      await updateDoc(doc(db, "pets", petId), {
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
                <label>Pet Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Skittle"
                  defaultValue={pet.name || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Pet Breed</label>
                <input
                  id="breed"
                  type="text"
                  placeholder="Mini Poodle"
                  defaultValue={pet.breed || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Birthday</label>
                <input
                  id="birthday"
                  type="date"
                  placeholder="04/20/2005"
                  defaultValue={pet.birthday || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Wight in Kg</label>
                <input
                  id="weight"
                  type="number"
                  placeholder="10.00"
                  step="0.01"
                  defaultValue={pet.weight || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formButton">
                <button type="submit">Confirm Pet Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetUpdate;
