import React from "react";
import Signup from "./components/signup/Signup";
import Head from "./components/signup/Head";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfilePage from "./components/allusers/UserProfilePage";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/private/PrivateRoute";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route element={<PrivateRoute />}>
              <Route path="/userPage" element={<UserProfilePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
