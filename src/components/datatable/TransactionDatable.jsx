import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../appointmentdatatablesource";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const TransactionDatatable = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, "appointments"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          console.log("Doctor Id", doc.data().doctor);
          // if (doc.data().doctor === currentUser.uid) {
          //   list.push({ id: doc.id, ...doc.data() });
          // }
          list.push({ id: doc.id, ...doc.data() });
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appointments", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status !== "Served" ? (
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
            {params.row.status !== "Served" ? (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Cancel
              </div>
            ) : (
              ""
            )}
            {params.row.status !== "Served" ? (
              <Link
                to={"/transactions/update/" + params.row.id}
                state={{ role: role }}
                style={{ textDecoration: "none" }}
              >
                <div className="editButton">Serve</div>
              </Link>
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
        Transactions
        {/* <Link to="/appointments/new" className="link">
          Add New Transaactions
        </Link> */}
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

export default TransactionDatatable;
