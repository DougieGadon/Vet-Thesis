import "./appointmentupdate.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { getSpecificDocumentFromCollection } from "../../../firebaseQueries";

const AppointmentUpdate = ({ inputs, title }) => {
  const { appointmentId } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const { currentUser } = useContext(AuthContext);

  const [doctor, setDoctor] = useState([]);
  const [pet, setPet] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [petName, setPetName] = useState([]);
  const [appointment, setAppointment] = useState([]);

  const date = new Date();
  const theDayOfTheMonthOnNextWeek = date.getDate() + 7;
  date.setDate(theDayOfTheMonthOnNextWeek);

  useEffect(() => {
    (async () => {
      try {
        console.log("Appointment ID", appointmentId);
        const appointmentData = await getSpecificDocumentFromCollection(
          "appointments",
          appointmentId
        );
        setAppointment(appointmentData);
        console.log("Appointment Update", appointmentData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (petName.length > 0 && doctorName.length === 0) {
        await updateDoc(doc(db, "appointments", appointmentId), {
          ...data,
          timeStamp: serverTimestamp(),
          petname: petName,
          doctorname: appointment.doctorname,
        });
      }
      if (petName.length === 0 && doctorName.length > 0) {
        await updateDoc(doc(db, "appointments", appointmentId), {
          ...data,
          timeStamp: serverTimestamp(),
          petname: appointment.petname,
          doctorname: doctorName,
        });
      }
      if (petName.length > 0 && doctorName.length > 0) {
        await updateDoc(doc(db, "appointments", appointmentId), {
          ...data,
          timeStamp: serverTimestamp(),
          doctorname: doctorName,
          petname: petName,
        });
      }
      if (petName.length === 0 && doctorName.length === 0) {
        await updateDoc(doc(db, "appointments", appointmentId), {
          ...data,
          timeStamp: serverTimestamp(),
          petname: appointment.petname,
          doctorname: appointment.doctorname,
        });
      }
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
                <select type="text" id="pet" onChange={handleInput}>
                  <option value="">Pet</option>
                  {pet.map((petDetail) =>
                    petDetail.id === appointment.pet ? (
                      <option
                        key={`${petDetail.id}`}
                        value={`${petDetail.id}`}
                        selected
                      >
                        {petDetail.name}
                      </option>
                    ) : (
                      <option key={`${petDetail.id}`} value={`${petDetail.id}`}>
                        {petDetail.name}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="formInput">
                <label>Doctor Name</label>
                <select type="text" id="doctor" onChange={handleInput}>
                  <option value="">Doctor</option>
                  {doctor.map((doc) =>
                    doc.id === appointment.doctor ? (
                      <option key={`${doc.id}`} value={`${doc.id}`} selected>
                        {doc.displayName}
                      </option>
                    ) : (
                      <option key={`${doc.id}`} value={`${doc.id}`}>
                        {doc.displayName}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="formInput">
                <label>Date of Appointment</label>
                <input
                  type="date"
                  id="date_appointment"
                  min={date.toISOString().split("T")[0]}
                  defaultValue={
                    appointment.date_appointment ||
                    date.toISOString().split("T")[0]
                  }
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Time of Appointment</label>
                <input
                  type="time"
                  id="time_appointment"
                  min="08:00"
                  max="17:00"
                  defaultValue={appointment.time_appointment || ""}
                  onChange={handleInput}
                />
              </div>

              <div className="formButton">
                <button type="submit">Confirm Appointment Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentUpdate;
