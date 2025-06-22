import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import Auth from "../Auth/Auth";
import EditAccountDetails from "../../Components/EditAccount/EditAccountDetails";
import { useDispatch } from "react-redux";
import { getUserProfileAction } from "../../Redux/User/Action";

const Router = () => {
  const location = useLocation(); 
  console.log(location);
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(getUserProfileAction());
  });
  
  return (
    <div>
      {(location.pathname !== "/login") && (location.pathname !== "/signup") ? (

        <div className="flex">
          <div className="w-[20%] border border-l-slate-500">
            <Sidebar />
          </div>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="" element={<HomePage />}></Route>
              <Route path="/:username" element={<Profile />}></Route>
              <Route path="/story/:userId" element={<Story />}></Route>
              <Route path="/comment/:postId" element={<HomePage />}></Route>
              <Route path="/account/edit" element={<EditAccountDetails />}></Route>
            </Routes>
          </div>
        </div>
      ) : (
        <div>
          <Routes>
          <Route path="/signup" element={<Auth />}></Route>
          <Route path="/login" element={<Auth />}></Route>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Router;
