import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../NavBar/NavBar";
import { Link } from "react-router-dom";
import { getAllDocumentsFromSubcollection, getAllDocumentsFromCollection  } from "../../../firebaseQueries";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const name = useSelector((state) => state.user.id);

  const [doctors, setDoctors] = useState([]);

  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    const getDoctor = async () => {
          const doctorF = await getAllDocumentsFromCollection("users");
          console.log(doctorF);
          setDoctor(doctorF);
        };
        getDoctor();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const appointments = await getAllDocumentsFromSubcollection(
          "doctors",
          name,
          "appointments"
        );
        console.log(appointments);
        setAppointments(appointments);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-bgGreen">
      <NavBar />
      <h2 className="font-heading tracking-px-n mb-10 text-center text-5xl font-bold leading-none text-secGreen md:text-7xl xl:text-8xl">
        Appointments
      </h2>
      <div>
        <ul className="mx-auto flex h-auto w-full max-w-[500px] flex-col gap-5 px-5">
          {appointments.map((appoint) => {
            return (
              <li className="w-full rounded-md border-2 border-gray-300 bg-[#f2ffe2de] shadow-lg" key={appoint.id}>
                <div className="text-md flex h-32 w-full flex-col items-center justify-center gap-5 font-bold text-blackGreen">
                  {appoint.name} requested an appointment for: {appoint.date} at: {appoint.time_appointment}
                  <Link to={`/appointments/${appoint.doctor}/${appoint.id}`}>
                    <button className="rounded-md px-4 py-2 underline">
                      See detailed information {"->"}
                    </button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Appointments;
