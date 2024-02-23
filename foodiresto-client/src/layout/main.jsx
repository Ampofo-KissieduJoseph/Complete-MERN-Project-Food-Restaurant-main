import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../app.css";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div><Outlet className="min-h-screen"/>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
