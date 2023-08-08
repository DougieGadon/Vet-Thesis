import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";

const List = ({ transactions }) => {
  console.log("Table Transactions", transactions);

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  // const rows = [
  //   {
  //     petname: "Skittle",
  //     petid: "bedca34c-b997-4395-be5e-126b22147f3a",
  //     timeStamp: it,
  //     doctorid: "XZ23KkkdJ2YoH9bLtkIDjOQDtUq2",
  //     item: "VAC001-AntiRabies Vaccine-11",
  //   },
  //   {
  //     appointmentid: "030489e6-66f1-4b85-aed2-2cc02b78122e",
  //     timeStamp: it,
  //     doctorname: "Hans Joshua Orejola Aggabao",
  //     item: "SUR001-Surgey-999",
  //     type: "service",
  //   },
  // ];
  // console.log("Rows", rows);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Transaction ID</TableCell>
            <TableCell className="tableCell">Item</TableCell>
            <TableCell className="tableCell">Type</TableCell>
            <TableCell className="tableCell">Docton Name</TableCell>
            <TableCell className="tableCell">Pet Name</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                {row.item.split("-")[1]}
              </TableCell>
              <TableCell className="tableCell">{row.type}</TableCell>
              <TableCell className="tableCell">{row.doctorname}</TableCell>
              <TableCell className="tableCell">{row.petname}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
