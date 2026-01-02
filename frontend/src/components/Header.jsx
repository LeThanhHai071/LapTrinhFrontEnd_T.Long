import React from "react";
import { Link } from "react-router-dom";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header-main">
      <TopHeader onOpenMenu={() => setIsMenuOpen(true)} />
      <Navbar isOpen={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
