import React from "react";
import './index.css'
import { Route, Routes } from "react-router";
import Login from "./Components/UserManagement/User/Login";
import Register from "./Components/UserManagement/User/Register";
import Profile from "./Components/UserManagement/User/Profile";
import UpdateProfile from "./Components/UserManagement/User/UpdateProfile";
import AdminDashBoard from "./Components/UserManagement/Admin/AdminDashBoard";
import AddUser from "./Components/UserManagement/Admin/AddUser";
import UpdateUserAdmin from "./Components/UserManagement/Admin/UpdateUserAdmin";

function App() {
  return (
    <>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateProfile/:id" element={<UpdateProfile />} />
          <Route path="/adminDash" element={<AdminDashBoard />} />
          <Route path="/addUserAdmin" element={<AddUser />} />
          <Route path="/updateUserAdmin/:id" element={<UpdateUserAdmin />} />
        </Routes>
      </React.Fragment>
    </>
  );
}

export default App;
