import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { CalendarMonth, Pets, TrafficRounded } from "@mui/icons-material";
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Sidebar = ({ role }) => {
  const { dispatch } = useContext(AuthContext);

  console.log("Role", role);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          {role === "admin" ? <span className="logo">Admin</span> : ""}
          {role === "user" ? <span className="logo">User</span> : ""}
          {role === "doctor" ? <span className="logo">Doctor</span> : ""}
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          {role === "admin" ? (
            <Link
              to="/users"
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          {role === "admin" ? (
            <Link
              to="/products"
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <StoreIcon className="icon" />
                <span>Products</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          {role === "admin" ? (
            <Link
              to="/services"
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <StoreIcon className="icon" />
                <span>Services</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          {role === "user" ? (
            <Link
              to="/pets"
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <Pets className="icon" />
                <span>Pets</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          {role === "user" ? (
            <Link
              to="/appointments"
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <CalendarMonth className="icon" />
                <span>Appointments</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          {role === "doctor" ? (
            <Link
              to="/transactions"
              state={{ role: role }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <TrafficRounded className="icon" />
                <span>Transactions</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          <p className="title">USER</p>
          <Link
            to="/profile"
            state={{ role: role }}
            style={{ textDecoration: "none" }}
          >
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <ExitToAppIcon className="icon" />
              <div onClick={() => dispatch({ type: "LOGOUT", payload: null })}>
                <span>Logout</span>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
