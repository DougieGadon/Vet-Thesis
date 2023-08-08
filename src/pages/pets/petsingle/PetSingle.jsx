import "./petsingle.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Chart from "../../../components/chart/Chart";
import List from "../../../components/table/Table";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";
import { useLocation } from "react-router-dom";

const PetSingle = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState({});

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  useEffect(() => {
    (async () => {
      try {
        const petData = await getSpecificDocumentFromCollection("pets", petId);
        setPet(petData);
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
                <h1 className="itemTitle">Pets</h1>
                <div className="detailItem">
                  <span className="itemKey">Pet Name:</span>
                  <span className="itemValue">{pet.name}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pet Breed:</span>
                  <span className="itemValue">{pet.breed}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pet Birthday:</span>
                  <span className="itemValue">{pet.birthday}</span>
                  <span className="itemValue"></span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Weight:</span>
                  <span className="itemValue">{pet.weight}</span>
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

export default PetSingle;
