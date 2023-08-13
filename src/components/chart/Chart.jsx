import { collection, getDocs, query } from "firebase/firestore";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { db } from "../../firebase";
import { useState } from "react";

const Chart = ({ transactions, aspect, title }) => {
  console.log("Transactions Chart", transactions);
  // console.log(
  //   "Trasaction Date and Amount",
  //   new Date(transactions[0].timeStamp.seconds * 1000).toLocaleString(
  //     "default",
  //     { month: "long" }
  //   ),
  //   transactions[0].amount
  // );
  const transactData = [];
  transactions.forEach((transact) => {
    console.log(
      "Transactions Data",
      new Date(transact.timeStamp.seconds * 1000).toLocaleString("default", {
        month: "long",
      }),
      transact.amount
    );
    transactData.push({
      name: new Date(transact.timeStamp.seconds * 1000).toLocaleString(
        "default",
        { month: "long" }
      ),
      Total: transact.amount,
    });
  });

  console.log("Data Transactions", transactData);

  function group_by_month(arr) {
    return Object.values(
      arr.reduce((a, { name: date_string, Total: amount }) => {
        const key = date_string;

        if (a[key] === undefined) {
          a[key] = { amount: 0, month: key };
        }

        a[key].amount += Number(amount);

        return a;
      }, {})
    );
  }

  const grouped_by_month = group_by_month(transactData).sort((a, b) =>
    b.month.localeCompare(a.month)
  );

  const data = grouped_by_month;

  console.log("Group by month", grouped_by_month);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
