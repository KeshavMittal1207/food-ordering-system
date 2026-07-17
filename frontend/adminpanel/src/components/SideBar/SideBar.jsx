import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideBar = ({ sideBarVisible }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`border-end ${sideBarVisible ? '' : 'd-none'}`} id="sidebar-wrapper" style={{ minWidth: '17rem' }}>
      <div className="sidebar-heading">
        <div className="d-flex align-items-center gap-2">
          <span className="d-inline-flex justify-content-center align-items-center" style={{ border: '2px solid #2d6a4f', padding: '2px', borderRadius: '4px', width: '22px', height: '22px' }}>
            <span style={{ width: '10px', height: '10px', backgroundColor: '#2d6a4f', borderRadius: '50%' }}></span>
          </span>
          <span className="text-white fw-bold tracking-wider fs-3">Urban<span style={{ color: '#c5a880' }}>Bites</span></span>
        </div>
      </div>
      <div className="list-group list-group-flush">
        <Link className={`list-group-item list-group-item-action ${isActive('/add')}`} to="/add">
          <i className="bi bi-plus-circle me-3"></i>Add Food
        </Link>
        <Link className={`list-group-item list-group-item-action ${isActive('/list') || isActive('/')}`} to="/list">
          <i className="bi bi-grid me-3"></i>List Food
        </Link>
        <Link className={`list-group-item list-group-item-action ${isActive('/orders')}`} to="/orders">
          <i className="bi bi-receipt me-3"></i>Orders List
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
