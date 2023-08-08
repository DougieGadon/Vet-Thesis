import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Update from "./pages/update/Update";
import Profile from "./pages/profile/Profile";

import "./style/dark.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  productInputs,
  userInputs,
  serviceInputs,
  petInputs,
  appointmentInputs,
  transactionInputs,
} from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import ProductList from "./pages/products/productlist/ProductList";
import ProductSingle from "./pages/products/productsingle/ProductSingle";
import ProductNew from "./pages/products/productnew/ProcuctNew";
import ProductUpdate from "./pages/products/productupdate/ProductUpdate";
import ServiceList from "./pages/services/servicetlist/ServiceList";
import ServiceSingle from "./pages/services/servicesingle/ServiceSingle";
import ServiceNew from "./pages/services/servicenew/ServiceNew";
import ServiceUpdate from "./pages/services/serviceupdate/ServiceUpdate";
import PetList from "./pages/pets/petlist/PetList";
import PetSingle from "./pages/pets/petsingle/PetSingle";
import PetNew from "./pages/pets/petnew/PetNew";
import PetUpdate from "./pages/pets/petupdate/PetUpdate";
import AppointmentNew from "./pages/appointments/appointmentnew/AppointmentNew";
import AppointmentSingle from "./pages/appointments/appointmentsingle/AppointmentSingle";
import AppointmentUpdate from "./pages/appointments/appointmentupdate/AppointmentUpdate";
import AppointmentList from "./pages/appointments/appointmentlist/AppointmentList";
import TransactionsList from "./pages/transactions/transactionslist/TransactionsList";
import TransactionsSingle from "./pages/transactions/transactionssingle/TransactionsSingle";
import TransactionsNew from "./pages/transactions/transactionsnew/TransactionsNew";
import TransactionsUpdate from "./pages/transactions/transactionsupdate/TransactionsUpdate";
import LandingPage from "./pages/landingpage/LandingPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="dashboard"
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:userId"
                element={
                  <RequireAuth>
                    <Update inputs={userInputs} title="Update User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ProductList />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <ProductSingle />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <ProductNew
                      inputs={productInputs}
                      title="Add New Product"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:productId"
                element={
                  <RequireAuth>
                    <ProductUpdate
                      inputs={productInputs}
                      title="Update Product"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="services">
              <Route
                index
                element={
                  <RequireAuth>
                    <ServiceList />
                  </RequireAuth>
                }
              />
              <Route
                path=":serviceId"
                element={
                  <RequireAuth>
                    <ServiceSingle />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <ServiceNew
                      inputs={serviceInputs}
                      title="Add New Service"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:serviceId"
                element={
                  <RequireAuth>
                    <ServiceUpdate
                      inputs={serviceInputs}
                      title="Update Service"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="pets">
              <Route
                index
                element={
                  <RequireAuth>
                    <PetList />
                  </RequireAuth>
                }
              />
              <Route
                path=":petId"
                element={
                  <RequireAuth>
                    <PetSingle />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <PetNew inputs={petInputs} title="Add New Pets" />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:petId"
                element={
                  <RequireAuth>
                    <PetUpdate inputs={petInputs} title="Update Pet" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="appointments">
              <Route
                index
                element={
                  <RequireAuth>
                    <AppointmentList />
                  </RequireAuth>
                }
              />
              <Route
                path=":appointmentId"
                element={
                  <RequireAuth>
                    <AppointmentSingle />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <AppointmentNew
                      inputs={appointmentInputs}
                      title="Add New Appointment"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:appointmentId"
                element={
                  <RequireAuth>
                    <AppointmentUpdate
                      inputs={petInputs}
                      title="Appointment to Serve"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="transactions">
              <Route
                index
                element={
                  <RequireAuth>
                    <TransactionsList />
                  </RequireAuth>
                }
              />
              <Route
                path=":transactionId"
                element={
                  <RequireAuth>
                    <TransactionsSingle />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <TransactionsNew
                      inputs={transactionInputs}
                      title="Add New Appointment"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:transactionId"
                element={
                  <RequireAuth>
                    <TransactionsUpdate
                      inputs={transactionInputs}
                      title="Appointment To Serve"
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
