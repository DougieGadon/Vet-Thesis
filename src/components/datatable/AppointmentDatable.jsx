import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../appointmentdatatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { updateSpecificDocumentInCollection } from "../../firebaseQueries";

const AppointmentDatatable = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const { role } = location.state;
  console.log(role);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // LISTEN (REALTIME)

    const getTransactions = async () => {
      const q2 = query(
        collection(db, "appointments"),
        where("userid", "==", currentUser.uid)
      );
      console.log("User", currentUser.uid);
      const querySnapshot = await getDocs(q2);
      console.log("Appointment Data", querySnapshot.docs.push);
      querySnapshot.forEach((doc) => {
        console.log("Payment status before", doc.data().paymentstatus);
        if (doc.data().paymentstatus === "Pending") {
          updatePaymentStatus(doc.data());
        }
      });
    };
    getTransactions();

    const unsub = onSnapshot(
      collection(db, "appointments"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          if (role === "admin") {
            list.push({ id: doc.id, ...doc.data() });
          } else {
            if (doc.data().userid === currentUser.uid) {
              list.push({ id: doc.id, ...doc.data() });
            }
          }
        });
        console.log("Appointment List", list);
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const updatePaymentStatus = async (value) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Basic c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI6",
        Authorization:
          "Basic cGtfdGVzdF9qUXhNTFZDdENlQkwyZDN2MWZBYWpTcEQ6c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI=",
      },
    };
    const data = await fetch(
      `https://api.paymongo.com/v1/links/${value.paymentlink}`,
      requestOptions
    ).then((response) => response.json());

    console.log("Payment Status", data.data.attributes.status);
    if (data.data.attributes.status === "paid") {
      try {
        await updateSpecificDocumentInCollection("appointments", value.id, {
          paymentstatus: "Paid",
        });
      } catch (error) {}
    }
  };

  const updatePayment = async (value, id) => {
    await updateSpecificDocumentInCollection("appointments", id, {
      paymentlink: value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async (id, totalAmount) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Basic c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI6",
        Authorization:
          "Basic cGtfdGVzdF9qUXhNTFZDdENlQkwyZDN2MWZBYWpTcEQ6c2tfdGVzdF95NTR0NHhxeEZBd3I5cUUyRW9nYVZ4QVI=",
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: Number(totalAmount) * 100,
            description: id,
            remarks: "Total Payment",
          },
        },
      }),
    };
    const data = await fetch(
      "https://api.paymongo.com/v1/links",
      requestOptions
    ).then((response) => response.json());

    console.log("Payment Response", data);
    console.log(
      "Payment Link and Id",
      data.data.attributes.checkout_url.split("/").pop(),
      id
    );
    updatePayment(data.data.attributes.checkout_url.split("/").pop(), id);

    window.open(
      data.data.attributes.checkout_url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.paymentstatus !== "Pending" &&
            params.row.paymentstatus !== "Paid" ? (
              <Link
                to={params.row.id}
                state={{ role: role }}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
            ) : (
              ""
            )}
            {params.row.paymentstatus !== "Pending" &&
            params.row.paymentstatus !== "Paid" ? (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            ) : (
              ""
            )}
            {params.row.paymentstatus !== "Pending" &&
            params.row.paymentstatus !== "Paid" ? (
              <Link
                to={"/appointments/update/" + params.row.id}
                state={{ role: role }}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">Edit</div>
              </Link>
            ) : (
              ""
            )}
            {params.row.paymentstatus === "Pending" ? (
              <div
                className="editButton"
                onClick={() =>
                  handlePayment(params.row.id, params.row.totalAmount)
                }
              >
                Pay Now
              </div>
            ) : (
              ""
            )}
            {params.row.paymentstatus === "Paid" ? (
              <div className="editButton">Paid</div>
            ) : (
              ""
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Appointments
        <Link to="/appointments/new" state={{ role: role }} className="link">
          Add New Appointment
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default AppointmentDatatable;
