import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuBar = ({ toggleSideBar }) => {
  const adminEmail = localStorage.getItem('adminEmail');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    window.location.reload(); // Hard reload to clear state and trigger login guard
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom px-4" style={{ background: '#151226', borderColor: 'rgba(255, 255, 255, 0.08)' }}>
      <div className="container-fluid">
        <button className="btn btn-outline-warning rounded-3 me-3" id="sidebarToggle" onClick={toggleSideBar}>
          <i className="bi bi-list fs-5"></i>
        </button>
        <span className="navbar-brand text-white fw-bold mb-0 h1 fs-5">Admin Control Panel</span>
        
        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="d-none d-md-flex flex-column align-items-end text-end">
            <span className="text-white fw-semibold mb-0" style={{ fontSize: '0.9rem' }}>System Administrator</span>
            <span className="text-white-50" style={{ fontSize: '0.75rem' }}>{adminEmail}</span>
          </div>
          <div className="vr bg-white-50" style={{ height: '30px', opacity: 0.15 }}></div>
          <button className="btn btn-sm btn-outline-danger px-3 py-2 rounded-pill fw-semibold" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
