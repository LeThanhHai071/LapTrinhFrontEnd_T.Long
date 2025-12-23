import React from "react";
import { Link } from "react-router-dom";
import TopHeader from './TopHeader'
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="header-container">
      <TopHeader />
      <Navbar />
    </header>
  );
};

export default Header;
