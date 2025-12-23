import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/TopHeader'
import MainLayout from './components/MainLayout';
import Menu from './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => <div>Nội dung Trang Chủ</div>;

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
