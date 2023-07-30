import { Routes, Route } from "react-router-dom";

import Main from "./components/Pages/Main/Main";
import Profile from "./components/Pages/Profile/Profile";
import SignUp from "./components/Pages/SignUp/SignUp";
import SignIn from "./components/Pages/SignIn/SignIn";
import RequestAnAppointment from "./components/Pages/RequestAnAppointment/RequestAnAppointment";
import Services from "./components/Pages/Services/Services";
import SpecificService from "./components/Pages/SpecificService/SpecificService";
import Doctors from "./components/Pages/Doctors/Doctors";
import SpecificDoctor from "./components/Pages/SpecificDoctor/SpecificDoctor";
import AboutUs from "./components/Pages/AboutUs/AboutUs";
import FAQ from "./components/Pages/FAQ/FAQ";
import ContactInfo from "./components/Pages/ContactInfo/ContactInfo";
import Error from "./components/Pages/Error/Error";
import UserList from "./components/Pages/UserList/UserList";
import BannedUsers from "./components/Pages/BannedUsers/BannedUsers";
import PendingReviews from "./components/Pages/PendingReviews/PendingReviews";
import Appointments from "./components/Pages/Appointments/Appointments";
import SpecificAppointment from "./components/Pages/SpecificAppointment/SpecificAppointment";
import Reviews from "./components/Pages/Reviews/Reviews";
import { APrivateRoutes, DPrivateRoutes } from "./privateRoutes";
import ResetPassword from "./components/Pages/ResetPassword/ResetPassword";
import SignUpAdmin from "./components/Pages/SignUp/SignUpAdmin";
import SignUpDoctor from "./components/Pages/SignUp/SignUpDoctor";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-appointment" element={<RequestAnAppointment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contacts" element={<ContactInfo />} />
        <Route element={<APrivateRoutes />}>
          <Route path="/user-list" element={<UserList />} />
          <Route path="/banned-users" element={<BannedUsers />} />
          <Route path="/pending-reviews" element={<PendingReviews />} />
          <Route path="/signup-admin" element={<SignUpAdmin />} />
          <Route path="/signup-doctor" element={<SignUpDoctor />} />
        </Route>
        <Route element={<DPrivateRoutes />}>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/:id" element={<SpecificAppointment />} />
          <Route path="/reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
