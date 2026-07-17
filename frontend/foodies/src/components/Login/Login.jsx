import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/authService';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(data);
      if (response?.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authEmail', response.email);
        setToken(response.token);
        toast.success('Welcome back to Urban Bites!');
        navigate('/');
      } else {
        toast.error('Login failed. Invalid response from server.');
      }
    } catch (error) {
      toast.error('Unable to login. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-container">
        {/* Left Side: Brand Visuals */}
        <div className="brand-visual-section">
          <div className="brand-visual-overlay"></div>
          <div className="brand-visual-content">
            <div className="brand-logo mb-4">
              <span className="logo-indicator">
                <span className="logo-dot"></span>
              </span>
              <span className="logo-text">Urban<span className="accent">Bites</span></span>
            </div>
            
            <div className="brand-pitch">
              <h2 className="pitch-title">Savor Delhi's Finest Pure Vegetarian Delights</h2>
              <p className="pitch-desc">
                From slow-cooked aromatic biryanis to artisan eggless desserts, order fresh and get it delivered in minutes.
              </p>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <i className="bi bi-shield-check"></i>
                <div>
                  <h6>100% Pure Vegetarian</h6>
                  <p>Prepared in strictly veg-only kitchen facilities.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="bi bi-lightning-charge"></i>
                <div>
                  <h6>Hot & Fast Delivery</h6>
                  <p>Dedicated riders ensuring freshness in every bite.</p>
                </div>
              </div>
            </div>

            <div className="brand-footer-text">
              <span>© {new Date().getFullYear()} Urban Bites. All Rights Reserved.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="form-section">
          <div className="form-content-box">
            <div className="form-header mb-4">
              <h3 className="fw-bold">Sign In</h3>
              <p className="text-muted">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-4">
                <label className="form-label fw-medium text-secondary">Email Address</label>
                <div className="input-group-custom">
                  <span className="input-icon"><i className="bi bi-envelope"></i></span>
                  <input
                    type="email"
                    className="form-control-custom"
                    placeholder="Enter your email"
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label fw-medium text-secondary mb-0">Password</label>
                  <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                </div>
                <div className="input-group-custom">
                  <span className="input-icon"><i className="bi bi-lock"></i></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control-custom"
                    placeholder="Enter password"
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
              </div>

              <button
                className="btn btn-brand-primary w-100 py-3 mb-4 mt-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Signing in...
                  </span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              <div className="text-center">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="auth-action-link fw-bold">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
