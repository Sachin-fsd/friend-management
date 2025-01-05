import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import AuthLayout from "./components/AuthLayout";
import Home from "./pages/Home";
import About from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "./components/ui/toaster";
import { SonnerToast } from "./components/ui/sonner";
import RequestsComponent from "./components/requests";
import FriendsComponent from "./pages/Friends";
import Suggestions from "./pages/Suggestions";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default layout */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/requests" element={<RequestsComponent />} />
          <Route path="/friends" element={<FriendsComponent />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/search" element={<Search />} />
        </Route>

        {/* Authentication layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <Toaster />
      <SonnerToast />

    </Router>
  );
}

export default App;
