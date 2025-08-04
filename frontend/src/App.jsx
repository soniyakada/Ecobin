import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import CreatePickupRequest from "./pages/CreatePickupRequest";
import AdminDashboard from "./pages/AdminDashboard";
import AllPickup from "./pages/AllPickup";
import CreateStaff from "./pages/CreateStaff";
import AllStaffPage from "./pages/AllStaffPage";


function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/signin" element={<Signin/>}></Route>
           <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/userDashboard" element={<UserDashboard/>}></Route>
           <Route path="/createnewpickup" element={<CreatePickupRequest/>}></Route>
           <Route path="/adminDashboard"element={<AdminDashboard/>}></Route>
           <Route path="/admin/pickup-requests" element={<AllPickup/>}></Route>
           <Route path="/admin/create-staff" element={<CreateStaff />}/>
           <Route path="/admin/all-staff" element={<AllStaffPage/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
