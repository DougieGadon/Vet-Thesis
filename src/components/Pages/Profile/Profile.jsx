import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";
import { auth } from "../../../firebase";
import { resetState } from "../../../redux/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import {
  deleteSpecificDocumentFromSubcollection,
  getSpecificDocumentFromCollection,
  getSpecificDocumentFromSubcollection,
  updateSpecificDocumentInCollection,
  updateDocumentInSubcollection,
} from "../../../firebaseQueries";
import Modal from "../../Modal/Modal";

const Profile = () => {
  const [user, setUser] = useState({});
  const [doctor, setDoctor] = useState({});
  const [status, setStatus] = useState({});
  const [userAppointment, setUserAppointment] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const whoUse = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const userSignOut = () => {
    auth.signOut();
    dispatch(resetState());
    navigate("/");
  };

  async function handlePaymentClick(amount, description, remarks) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI6'},
      body: JSON.stringify({ "data": { "attributes": { "amount": amount, "description": description, "remarks": remarks } }})
    };
    const data = await fetch('https://api.paymongo.com/v1/links', requestOptions)
      .then(response => response.json());
    
    updatePaymentStatus(data.data.attributes.checkout_url.split("/").pop());
      
    window.open(data.data.attributes.checkout_url, '_blank', 'noopener,noreferrer');

  }

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getSpecificDocumentFromCollection("users", userId);
      const userVisit = await getSpecificDocumentFromSubcollection(
        "users",
        userId,
        "appointment",
        "main"
      );
      setUser(userData);
      setUserAppointment(userVisit);
      console.log("appointment");
      console.log(userVisit);

      const doctorData = await getSpecificDocumentFromCollection("users", userVisit.doctor);
      setDoctor(doctorData);
      console.log("doctor");
      console.log(doctorData.id);
      console.log(userVisit.payment_link_id);

      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI6'}
      };
      const data = await fetch(`https://api.paymongo.com/v1/links/${userVisit.payment_link_id}`, requestOptions)
        .then(response => response.json());
      
        console.log(data.data.attributes.status);
        if(data.data.attributes.status==='paid') {
          try {
            await updateDocumentInSubcollection("doctors", doctorData.id, "appointments", userVisit.id, {
              payment_status: "Paid",
            });
            await updateDocumentInSubcollection("users", userData.id, "appointment", "main", {
              payment_status: "Paid",
            });
          } catch (error) {
            setModalActive(true);
            setTitle("Something went wrong!");
            setMessage(`${error.message}`);
          }
        }

    };
    getUserData();
    
  }, []);

  const cancelAppointment = async () => {
    try {
      await deleteSpecificDocumentFromSubcollection(
        "users",
        userId,
        "appointment",
        "main"
      );
      await deleteSpecificDocumentFromSubcollection(
        "doctors",
        userAppointment.doctor,
        "appointments",
        userAppointment.id
      );
      await updateSpecificDocumentInCollection("users", userId, {
        made: false,
      });
      setUserAppointment(undefined);
      setModalActive(true);
      setTitle("Successful");
      setMessage("You have succesfully cancelled your appointment");
    } catch (error) {
      setModalActive(true);
      setTitle("Something went wrong!");
      setMessage(`${error.message}`);
    }
  };

  const updatePaymentStatus = async (payment_link_id) => {
    try {
      await updateDocumentInSubcollection("doctors", doctor.id, "appointments", userAppointment.id, {
        payment_status: "Pending",
        payment_link_id: payment_link_id,
      });
      await updateDocumentInSubcollection("users", userId, "appointment", "main", {
        payment_status: "Pending",
        payment_link_id: payment_link_id,
      });
    } catch (error) {
      setModalActive(true);
      setTitle("Something went wrong!");
      setMessage(`${error.message}`);
    }
  };
  return (
    <div className="min-h-screen bg-bgGreen">
      <NavBar />
      <h2 className="font-heading tracking-px-n mb-5 text-center text-3xl font-bold leading-none text-secGreen md:text-4xl xl:text-5xl">
        Profile
      </h2>
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-center gap-4 px-4 md:flex-row">
        {/* <div className="w-full md:w-1/2">
          <img
            className="w-full rounded-md opacity-95"
            src="/assets/profile/ducks.jpg"
          />
        </div> */}
        {whoUse === "user" || whoUse === "doctor"? (
          <div className="md:flex md:flex-col md:justify-between md:gap-5">
            <p className="text-xl font-bold">
              Name:{" "}
              <span className="font-thin text-secGreen">
                {user.name ? user.name : ""}
              </span>{" "}
            </p>
            <p className="text-xl font-bold">
              Surname:{" "}
              <span className="font-thin text-secGreen">
                {user.surname ? user.surname : ""}
              </span>
            </p>
            <p className="text-xl font-bold">
              Email:{" "}
              <span className="font-thin text-secGreen">
                {user.email ? user.email : ""}
              </span>{" "}
            </p>
            {/* <p className="text-xl font-bold">
              Have you made an appointment:{" "}
              <span className="font-thin text-secGreen">
                {user.made === false ? "No" : "Yes"}
              </span>{" "}
            </p>
            <p className="text-xl font-bold">
              Have you left a review:{" "}
              <span className="font-thin text-secGreen">
                {user.sent === false ? "No" : "Yes"}
              </span>{" "}
            </p> */}
          </div>
        ) : (
          ""
        )}
      </div>
      {user.role === "user" && userAppointment !== undefined ? (
        <div className="mx-auto mt-10 text-blackGreen">
          <h2 className="font-heading tracking-px-n mb-5 text-center text-3xl font-bold leading-none text-secGreen md:text-4xl xl:text-5xl">
            Appointment
          </h2>

          <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center gap-3 border-2 border-secGreen p-4 text-lg">
            <p>
              <span className="font-bold">To: </span>
              {/* {userAppointment.doctor
                ? `${userAppointment.doctor[0].toUpperCase()}${userAppointment.doctor.slice(
                    1
                  )}`
                : ""} */}
                {doctor.name
                ? `${doctor.name.toUpperCase()} ${doctor.surname.toUpperCase()}`
                : ""}
            </p>
            <p>
              <span className="font-bold">Service: </span>
              {userAppointment.service
                ? `${userAppointment.service[0].toUpperCase()}${userAppointment.service.slice(
                    1
                  )}`
                : ""}
            </p>
            <p>
              <span className="font-bold">Appointment Date: </span>
              {userAppointment.date ? userAppointment.date : ""}
            </p>
            <p>
              <span className="font-bold">Appointment Time: </span>
              {userAppointment.time_appointment ? userAppointment.time_appointment : ""}
            </p>
            <div className="flex justify-between">
            {userAppointment.payment_status === "Paid" ? (
              <div>
              <button
                className="rounded-sm border-2 border-secGreen px-6 py-3 font-bold text-secGreen duration-200"
              >
                No Refund 
              </button>
              </div>
            ) : (
              <div>
              <button
                className="rounded-sm border-2 border-secGreen px-6 py-3 font-bold text-secGreen duration-200 hover:bg-secGreen hover:text-bgGreen"
                onClick={cancelAppointment}
              >
                Cancel 
              </button>
              </div>
            )}
              {userAppointment.payment_status === "Paid" ? (
                <div>
                <button className="rounded-sm border-2 border-secGreen px-6 py-3 font-bold text-secGreen duration-200">
                Paid
                </button>
                </div>
              ) : (
              <div>
              <button className="rounded-sm border-2 border-secGreen px-6 py-3 font-bold text-secGreen duration-200 hover:bg-secGreen hover:text-bgGreen" onClick={()=>{handlePaymentClick(10000, userAppointment.service
                ? `${userAppointment.service[0].toUpperCase()}${userAppointment.service.slice(
                    1
                  )}`
                : "",  userAppointment.date ? userAppointment.date : "")}}>
              Pay Now
              </button>
              </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <Modal
        active={modalActive}
        setActive={setModalActive}
        title={title}
        message={message}
        button={true}
        linkTo={null}
        buttonText={"Ok"}
      />
    </div>
  );
};

export default Profile;
