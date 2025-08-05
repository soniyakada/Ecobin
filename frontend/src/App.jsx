import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/FrontPages/Home";
import Signin from "./pages/FrontPages/Signin";
import Signup from "./pages/FrontPages/Signup";
import UserDashboard from "./pages/UserPages/UserDashboard";
import CreatePickupRequest from "./pages/UserPages/CreatePickupRequest";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AllPickup from "./pages/AdminPages/AllPickup";
import CreateStaff from "./pages/AdminPages/CreateStaff";
import AllStaffPage from "./pages/AdminPages/AllStaffPage";
import History from "./pages/AdminPages/History";
import Scheduled from "./pages/AdminPages/Scheduled";


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
           <Route path="/admin/history" element={<History/>}></Route>
            <Route path="/admin/scheduled" element={<Scheduled/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
