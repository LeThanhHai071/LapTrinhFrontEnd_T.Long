import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const HomePage = () => <div>Nội dung Trang Chủ</div>;

function App() {
  return (
    <BrowserRouter>
      <Header /> 
    </BrowserRouter>
  );
}

export default App;
