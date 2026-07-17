import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../service/authService';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
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
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        toast.error('Unable to register. Please try again.');
      }
    } catch (error) {
      toast.error('Unable to register. Email might already exist.');
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
              <h2 className="pitch-title">Create Your Free Account Today</h2>
              <p className="pitch-desc">
                Join thousands of food lovers in Delhi enjoying premium pure-vegetarian meals delivered fast and fresh.
              </p>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <i className="bi bi-gift"></i>
                <div>
                  <h6>Exclusive Welcome Rewards</h6>
                  <p>Get special discounts on your first few orders.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="bi bi-star"></i>
                <div>
                  <h6>Curate Favorites & Track Orders</h6>
                  <p>Save favorite cuisines, save addresses, and track real-time delivery status.</p>
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
              <h3 className="fw-bold">Sign Up</h3>
              <p className="text-muted">Explore Delhi's best pure veg food.</p>
            </div>

            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label className="form-label fw-medium text-secondary">Full Name</label>
                <div className="input-group-custom">
                  <span className="input-icon"><i className="bi bi-person"></i></span>
                  <input
                    type="text"
                    className="form-control-custom"
                    placeholder="Enter your full name"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
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
                <label className="form-label fw-medium text-secondary">Password</label>
                <div className="input-group-custom">
                  <span className="input-icon"><i className="bi bi-lock"></i></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control-custom"
                    placeholder="Create a strong password"
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
                    Creating account...
                  </span>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>

              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="auth-action-link fw-bold">Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
