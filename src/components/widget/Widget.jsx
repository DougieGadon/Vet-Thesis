import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Widget = ({ role, type }) => {
  // const [amount, setAmount] = useState(null);
  // const [diff, setDiff] = useState(null);
  let data;
  const { currentUser } = useContext(AuthContext);
  const [count, setCount] = useState([]);

  switch (type) {
    case "appointments":
      data = {
        title: "ACTIVE APPOINTMENTS",
        isMoney: false,
        query: "appointments",
      };
      break;
    case "users":
      data = {
        title: "NUMBER OF USERS",
        query: "users",
        isMoney: false,
      };
      break;
    case "pets":
      data = {
        title: "NUMBER OF PETS",
        query: "pets",
        isMoney: false,
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        query: "products",
      };
      break;
    case "services":
      data = {
        title: "SERVICES",
        query: "services",
      };
      break;
    case "revenue":
      data = {
        title: "REVENUE",
        query: "revenue",
        isMoney: true,
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    console.log("current User", currentUser.uid);
    console.log("Role at Widget", role);
    if (data.query === "appointments") {
      const unsub1 = onSnapshot(
        collection(db, "appointments"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            console.log("Appointment User ID", doc.data().userid);
            if (
              role === "doctor" &&
              doc.data().doctor === currentUser.uid &&
              doc.data().status === "New"
            ) {
              list.push({ id: doc.id, ...doc.data() });
            } else if (
              role === "user" &&
              doc.data().userId === currentUser.uid &&
              doc.data().status === "New"
            ) {
              list.push({ id: doc.id, ...doc.data() });
            } else if (doc.data().status === "New") {
              list.push({ id: doc.id, ...doc.data() });
            }
          });
          console.log("Appointment List", list);
          setCount(list.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (data.query === "pets") {
      const unsub = onSnapshot(
        collection(db, "pets"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            console.log("Pet User", doc.data().userId);
            if (role === "admin") {
              list.push({ id: doc.id, ...doc.data() });
            } else {
              if (doc.data().userId === currentUser.uid) {
                list.push({ id: doc.id, ...doc.data() });
              }
            }
          });
          console.log("Pet List", list);
          setCount(list.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (data.query === "users") {
      const unsub = onSnapshot(
        collection(db, "users"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            console.log("Users", doc.data().userId);
            if (role === "admin") {
              list.push({ id: doc.id, ...doc.data() });
            }
          });
          console.log("Users List", list);
          setCount(list.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (data.query === "products") {
      const unsub = onSnapshot(
        collection(db, "products"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            console.log("Products", doc.data().userId);
            if (role === "admin") {
              list.push({ id: doc.id, ...doc.data() });
            }
          });
          console.log("Products List", list);
          setCount(list.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (data.query === "services") {
      const unsub = onSnapshot(
        collection(db, "services"),
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            console.log("Services", doc.data().userId);
            if (role === "admin") {
              list.push({ id: doc.id, ...doc.data() });
            }
          });
          console.log("Services List", list);
          setCount(list.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    if (data.query === "revenue") {
      console.log("Entered Revenue");
      const getTransactions = async () => {
        if (role === "doctor") {
          const q2 = query(
            collection(db, "transactions"),
            where("doctorid", "==", currentUser.uid)
          );
          const transacts = [];
          const querySnapshot = await getDocs(q2);
          console.log(querySnapshot.docs.push);
          let totalAmount = 0;
          querySnapshot.forEach((doc) => {
            totalAmount += Number(doc.data().amount);
          });
          console.log("Transactions ", totalAmount);
          setCount(totalAmount);
        }

        if (role === "admin") {
          const q2 = query(collection(db, "transactions"));
          const transacts = [];
          const querySnapshot = await getDocs(q2);
          console.log(querySnapshot.docs.push);
          let totalAmount = 0;
          querySnapshot.forEach((doc) => {
            totalAmount += Number(doc.data().amount);
          });
          console.log("Transactions ", totalAmount);
          setCount(totalAmount);
        }
      };
      getTransactions();
    }
  }, []);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₱"} {count}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Widget;
