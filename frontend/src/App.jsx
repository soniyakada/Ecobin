import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/FrontPages/Home";
import Signin from "./pages/FrontPages/Signin";
import Signup from "./pages/FrontPages/Signup";
import CreatePickupRequest from "./pages/UserPages/CreatePickupRequest";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import AllPickup from "./pages/AdminPages/AllPickup";
import CreateStaff from "./pages/AdminPages/CreateStaff";
import AllStaffPage from "./pages/AdminPages/AllStaffPage";
import History from "./pages/AdminPages/History";
import Scheduled from "./pages/AdminPages/Scheduled";
import RaisePickup from "./pages/UserPages/RaisePickup";
import Mypickups from "./pages/UserPages/Mypickup";
import UserProfile from "./pages/UserPages/UserProfile";
import Support from "./pages/UserPages/Support";
import UserHome from "./pages/UserPages/UserHome";
import NotFound from "./pages/FrontPages/NotFound";


function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/signin" element={<Signin/>}></Route>
           <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/createnewpickup" element={<CreatePickupRequest/>}></Route>
           <Route path="/adminDashboard"element={<AdminDashboard/>}></Route>
           <Route path="/admin/pickup-requests" element={<AllPickup/>}></Route>
           <Route path="/admin/create-staff" element={<CreateStaff />}/>
           <Route path="/admin/all-staff" element={<AllStaffPage/>}></Route>
           <Route path="/admin/history" element={<History/>}></Route>
           <Route path="/admin/scheduled" element={<Scheduled/>}></Route>
           <Route path="/user/request-pickup" element={<RaisePickup/>}></Route>
           <Route path="/user/my-pickups" element={<Mypickups/>}></Route>
           <Route path="/user/profile" element={<UserProfile/>}></Route>
           <Route path="/user/contactus" element={<Support/>}></Route>
           <Route path="/user/home" element={<UserHome/>}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
