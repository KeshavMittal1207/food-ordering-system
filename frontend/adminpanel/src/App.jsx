import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar.jsx';
import MenuBar from './components/MenuBar/MenuBar.jsx';
import AddFood from './pages/AddFood/AddFood.jsx';
import ListFood from './pages/ListFood/ListFood.jsx';
import Orders from './pages/Orders/Orders.jsx';
import Login from './components/Login/Login.jsx';
import { ToastContainer, toast } from 'react-toastify';
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [sideBarVisible, setSideBarVisible] = useState(true);

  useEffect(() => {
    const msg = sessionStorage.getItem('logout_message');
    if (msg) {
      toast.error(msg);
      sessionStorage.removeItem('logout_message');
    }
  }, []);

  const toggleSideBar = () => {
    setSideBarVisible(!sideBarVisible);
  };

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem('adminToken') || '');
  };

  if (!token) {
    return (
      <>
        <ToastContainer theme="dark" position="top-right" autoClose={3000} />
        <Login onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <div className="d-flex" id="wrapper">
      <SideBar sideBarVisible={sideBarVisible} />
      <div id="page-content-wrapper" className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <MenuBar toggleSideBar={toggleSideBar} />
        <ToastContainer theme="dark" position="top-right" autoClose={3000} />
        <div className="container-fluid py-4 px-4 px-md-5 flex-grow-1" style={{ background: '#0f0c1b' }}>
          <Routes>
            <Route path='/add' element={<AddFood />} />
            <Route path='/list' element={<ListFood />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/' element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
