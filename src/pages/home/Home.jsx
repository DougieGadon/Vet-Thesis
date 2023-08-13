import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Home = ({ role }) => {
  const [transactions, setTransaction] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  // const [role, setRole] = useState("");

  console.log("Current User", currentUser.uid);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const q1 = query(
  //       collection(db, "users"),
  //       where("id", "==", currentUser.uid)
  //     );
  //     const users = [];
  //     const querySnapshot = await getDocs(q1);
  //     console.log(querySnapshot.docs.push);
  //     querySnapshot.forEach((doc) => {
  //       users.push(doc.data());
  //       setRole(doc.data().role);
  //       console.log("Role 2", doc.data().role);
  //     });
  //     console.log("Users 1", users);
  //     console.log("Role 1", role);
  //   };
  //   getUsers();
  // }, []);

  useEffect(() => {
    const getTransactions = async () => {
      if (role === "user") {
        const q2 = query(
          collection(db, "transactions"),
          where("userid", "==", currentUser.uid)
        );
        const transacts = [];
        const querySnapshot = await getDocs(q2);
        console.log(querySnapshot.docs.push);
        querySnapshot.forEach((doc) => {
          transacts.push(doc.data());
        });
        console.log("Transactions ", transacts);
        setTransaction(transacts);
      }
      if (role === "doctor") {
        const q2 = query(
          collection(db, "transactions"),
          where("doctorid", "==", currentUser.uid)
        );
        const transacts = [];
        const querySnapshot = await getDocs(q2);
        console.log(querySnapshot.docs.push);
        querySnapshot.forEach((doc) => {
          transacts.push(doc.data());
        });
        console.log("Transactions ", transacts);
        setTransaction(transacts);
      }
      if (role === "admin") {
        console.log("Entered Admin Transaction");
        const q2 = query(collection(db, "transactions"));
        const transacts = [];
        const querySnapshot = await getDocs(q2);
        console.log(querySnapshot.docs.push);
        querySnapshot.forEach((doc) => {
          transacts.push(doc.data());
        });
        console.log("Transactions ", transacts);
        setTransaction(transacts);
      }
    };
    getTransactions();
  }, []);

  console.log("Role", role);

  return (
    <div className="home">
      <Sidebar role={role} />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {role === "admin" ? <Widget role={role} type="users" /> : ""}
          {role === "admin" ? <Widget role={role} type="products" /> : ""}
          {role === "admin" ? <Widget role={role} type="services" /> : ""}
          {role === "user" || role === "admin" ? (
            <Widget role={role} type="pets" />
          ) : (
            ""
          )}
          <Widget type="appointments" />
          {role === "admin" || role === "doctor" ? (
            <Widget role={role} type="revenue" />
          ) : (
            ""
          )}
        </div>
        <div className="charts">
          {/* {role === "admin" ? <Featured role={role} /> : ""} */}
          {role === "admin" ? (
            <Chart
              transactions={transactions}
              title="Last 6 Months (Revenue)"
              aspect={2 / 1}
            />
          ) : (
            ""
          )}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          {transactions.length > 0 ? <Table transactions={transactions} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default Home;
