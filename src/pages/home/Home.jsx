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

const Home = () => {
  const [transactions, setTransaction] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  console.log("Current User", currentUser.uid);

  useEffect(() => {
    const getTransactions = async () => {
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
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const q1 = query(
        collection(db, "users"),
        where("id", "==", currentUser.uid)
      );
      const users = [];
      const querySnapshot = await getDocs(q1);
      console.log(querySnapshot.docs.push);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      console.log("Users ", users);
      // setUsers(users);
      users.map((user) => setRole(user.role));
    };
    getUsers();
  }, []);

  // users.map((user) => setRole(user.role));

  return (
    <div className="home">
      <Sidebar role={role} />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
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
