import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../petdatatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const PetDatatable = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const { role } = location.state;
  console.log(role);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // LISTEN (REALTIME)
    console.log("current User", currentUser.uid);
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
      await deleteDoc(doc(db, "pets", id));
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
            <Link
              to={params.row.id}
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link
              to={"/pets/update/" + params.row.id}
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Pets
        <Link to="/pets/new" state={{ role: role }} className="link">
          Add New Pets
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

export default PetDatatable;
