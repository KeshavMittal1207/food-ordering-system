import React, { useState } from 'react';
import apiClient from '../../services/apiClient';
import { toast } from 'react-toastify';
import './Login.css';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const Login = ({ onLoginSuccess }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (data.email?.toLowerCase() !== ADMIN_EMAIL?.toLowerCase()) {
      toast.error('Access Denied: Only predefined admin accounts can access this portal.');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/api/login', data);
      if (response.data?.token) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminEmail', response.data.email);
        toast.success('Admin Login Successful');
        onLoginSuccess();
      } else {
        toast.error('Login failed. Invalid response from server.');
      }
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="login-glass-card shadow-lg">
        <div className="text-center mb-5">
          <div className="brand-logo mb-3">
            <i className="bi bi-shield-lock display-4 text-warning"></i>
          </div>
          <h2 className="fw-bold text-white mb-2">Admin Control</h2>
          <p className="text-white-50">Enter predefined credentials to access</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="form-group mb-4">
            <label className="text-white-50 mb-2" style={{ fontSize: '0.9rem' }}>Admin Email</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 border-white-10 text-white-50">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control bg-transparent text-white border-start-0 border-white-10"
                name="email"
                placeholder="admin@gmail.com"
                value={data.email}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>
          <div className="form-group mb-5">
            <label className="text-white-50 mb-2" style={{ fontSize: '0.9rem' }}>Secret Key</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 border-white-10 text-white-50">
                <i className="bi bi-key"></i>
              </span>
              <input
                type="password"
                className="form-control bg-transparent text-white border-start-0 border-white-10"
                name="password"
                placeholder="Enter password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-warning w-100 py-3 rounded-pill fw-bold text-uppercase text-dark shadow-sm border-0 transition-btn"
            disabled={loading}
          >
            {loading ? 'Authorizing...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
