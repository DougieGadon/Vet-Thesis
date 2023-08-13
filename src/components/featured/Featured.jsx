import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Featured = (role) => {
  const [count, setCount] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
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
    };
    getTransactions();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        {/* <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div> */}
        {/* <p className="title">Total sales made today</p> */}
        <p className="amount">
          {"₱"}
          {count}
        </p>
        {/* <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p> */}
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
