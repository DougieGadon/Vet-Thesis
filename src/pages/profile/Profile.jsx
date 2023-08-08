import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSpecificDocumentFromCollection } from "../../firebaseQueries";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const Profile = () => {
  // const { userId } = useParams();
  const [user, setUser] = useState({});

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  useEffect(() => {
    (async () => {
      try {
        console.log(currentUser);
        const userData = await getSpecificDocumentFromCollection(
          "users",
          currentUser.uid
        );
        setUser(userData);
        console.log("Users Data", userData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="profile">
      <Sidebar role={role} />
      <div className="profileContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{user.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">UserName:</span>
                  <span className="itemValue">{user.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{user.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{user.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
