import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { getSpecificDocumentFromCollection } from "../../firebaseQueries";
import { useLocation } from "react-router-dom";

const Update = ({ inputs, title }) => {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const userData = await getSpecificDocumentFromCollection(
          "users",
          userId
        );
        setUser(userData);
        console.log("TEST", userData);
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
      await updateDoc(doc(db, "users", userId), {
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
                <label>Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  defaultValue={user.username || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Name and surname</label>
                <input
                  id="displayName"
                  type="text"
                  placeholder="John Doe"
                  defaultValue={user.displayName || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  id="email"
                  type="mail"
                  placeholder="john_doe@gmail.com"
                  defaultValue={user.email || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="+1 234 567 89"
                  defaultValue={user.phone || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  defaultValue={user.password || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  id="address"
                  type="text"
                  placeholder="Manggahan, Gen. Trias, Cavite"
                  defaultValue={user.address || ""}
                  onChange={handleInput}
                />
              </div>
              <div className="formInput">
                <label>Role</label>
                <select
                  type="text"
                  id="role"
                  defaultValue={user.role}
                  onChange={handleInput}
                >
                  {user.role === "user" ? (
                    <option value="user" selected>
                      User
                    </option>
                  ) : (
                    <option value="user">User</option>
                  )}
                  {user.role === "doctor" ? (
                    <option value="doctor" selected>
                      Doctor
                    </option>
                  ) : (
                    <option value="doctor">Doctor</option>
                  )}
                  {user.role === "admin" ? (
                    <option value="admin" selected>
                      Admin
                    </option>
                  ) : (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>
              <div className="formButton">
                <button disabled={per !== null && per < 100} type="submit">
                  Confirm Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
