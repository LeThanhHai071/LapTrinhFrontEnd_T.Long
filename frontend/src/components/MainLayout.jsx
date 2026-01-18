import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "@fontsource/inter";
import "@fontsource/merriweather";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="app-container">
      <header className="header-main">
        <TopHeader onOpen Menu={() => setIsMenuOpen(true)} />
      </header>
      <Navbar isOpen={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
