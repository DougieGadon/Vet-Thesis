import "./appointmentnew.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const AppointmentNew = ({ inputs, title }) => {
  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [doctor, setDoctor] = useState([]);
  const [pet, setPet] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [petName, setPetName] = useState([]);

  const date = new Date();
  const theDayOfTheMonthOnNextWeek = date.getDate() + 7;
  date.setDate(theDayOfTheMonthOnNextWeek);

  useEffect(() => {
    const getDoctors = async () => {
      const q1 = query(collection(db, "users"), where("role", "==", "doctor"));
      const doctors = [];
      const querySnapshot = await getDocs(q1);
      console.log(querySnapshot.docs.push);
      querySnapshot.forEach((doc) => {
        doctors.push(doc.data());
      });
      console.log("Doctor ", doctors);
      setDoctor(doctors);
    };
    getDoctors();

    const getPets = async () => {
      const q2 = query(
        collection(db, "pets"),
        where("userId", "==", currentUser.uid)
      );
      const pets = [];
      const querySnapshot = await getDocs(q2);
      console.log(querySnapshot.docs.push);
      querySnapshot.forEach((doc) => {
        pets.push(doc.data());
      });
      console.log("Pets ", pets);
      setPet(pets);
    };
    getPets();
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "doctor") {
      setDoctorName(
        doctor
          .filter((item) => item.id === value)
          .map((item) => item.displayName)
          .at(0)
      );
    }
    if (id === "pet") {
      setPetName(
        pet
          .filter((item) => item.id === value)
          .map((item) => item.name)
          .at(0)
      );
    }
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    const appointmentId = uuidv4();
    e.preventDefault();
    try {
      console.log("Appointment Data", data);
      await setDoc(doc(db, "appointments", appointmentId), {
        ...data,
        timeStamp: serverTimestamp(),
        id: appointmentId,
        status: "New",
        paymentstatus: "Unpaid",
        paymentlink: "",
        petname: petName,
        doctorname: doctorName,
        userid: currentUser.uid,
      });
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
                <select type="text" id="pet" onChange={handleInput}>
                  <option value="">Pet</option>
                  {pet.map((petDetail) => (
                    <option key={`${petDetail.id}`} value={`${petDetail.id}`}>
                      {petDetail.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Doctor Name</label>
                <select type="text" id="doctor" onChange={handleInput}>
                  <option value="">Doctor</option>
                  {doctor.map((doc) => (
                    <option key={`${doc.id}`} value={`${doc.id}`}>
                      {doc.displayName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Date of Appointment</label>
                <input
                  type="date"
                  id="date_appointment"
                  min={date.toISOString().split("T")[0]}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Date of Appointment</label>
                <input
                  type="time"
                  id="time_appointment"
                  min="08:00"
                  max="17:00"
                  onChange={handleInput}
                />
              </div>
              <div className="formButton">
                <button type="submit">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentNew;
