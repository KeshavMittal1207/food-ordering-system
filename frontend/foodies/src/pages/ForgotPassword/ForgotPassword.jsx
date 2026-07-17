import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../service/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await forgotPassword(email);
      if (response && response.token) {
        toast.success('Reset token generated successfully!');
        // Redirect to reset password page and pass the token and email in state
        navigate('/reset-password', { state: { token: response.token, email } });
      } else {
        toast.error('Failed to generate reset token.');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Email not found or error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: '5rem' }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0 rounded-4 p-4" style={{ backgroundColor: '#ffffff' }}>
            <div className="card-body">
              <div className="text-center mb-4">
                <i className="bi bi-shield-lock-fill text-success" style={{ fontSize: '3rem' }}></i>
                <h3 className="fw-bold mt-2" style={{ color: '#1b4332' }}>Forgot Password</h3>
                <p className="text-muted small">Enter your email and we'll generate a reset token for you.</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label className="form-label text-muted small fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control py-2.5 rounded-3"
                    placeholder="Enter registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2.5 rounded-pill mb-3"
                  style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Generate Reset Token'}
                </button>

                <div className="text-center">
                  <Link to="/login" style={{ color: '#2d6a4f', textDecoration: 'none', fontWeight: '500' }}>
                    <i className="bi bi-arrow-left me-2"></i>Back to Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
