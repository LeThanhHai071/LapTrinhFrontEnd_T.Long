import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainLayout from "./components/MainLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import NewsDetail from "./NewsDetail";
import Subscription from "./Subscription";
import Advertise from "./Advertise";
import ShowWeather from "./ShowWeather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/weather" element={<ShowWeather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// import Login from "./login";
// import Home from "./home";
// import Register from "./register";
// import ShowWeather from "./ShowWeather";
// import Advertise from "./advertise";
// import NewsDetail from "./newsDetail.jsx";
// import Subscription from "./Subscription.jsx";

// function App() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Navigate to="/home"/>}/>
//                 <Route path="/home" element={<Home/>}/>
//                 <Route path="/login" element={<Login/>}/>
//                 <Route path="/register" element={<Register/>}/>
//                 <Route path="/news/:id" element={<NewsDetail/>}/>
//                 <Route path="/subscription" element={<Subscription/>}/>
//                 <Route path="/advertise" element={<Advertise/>}/>
//                 <Route path="/weather" element={<ShowWeather />} />
//             </Routes>
//         </BrowserRouter>
//     );
export default App;
