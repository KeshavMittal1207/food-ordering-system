import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../service/authService';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  useEffect(() => {
    if (location.state?.token) {
      setToken(location.state.token);
      setIsAutoFilled(true);
      toast.info('Reset token auto-filled for your convenience!');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await resetPassword(token, newPassword);
      toast.success(response.message || 'Password reset successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to reset password. Token may be invalid or expired.');
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
                <i className="bi bi-patch-check-fill text-success" style={{ fontSize: '3rem' }}></i>
                <h3 className="fw-bold mt-2" style={{ color: '#1b4332' }}>Reset Password</h3>
                <p className="text-muted small">Enter the reset token and choose a new secure password.</p>
              </div>

              {isAutoFilled && (
                <div className="alert alert-success border-0 rounded-3 small py-2 text-center" style={{ backgroundColor: '#eef8f4', color: '#1b4332' }}>
                  <i className="bi bi-info-circle me-1"></i> Demo Mode: Token captured automatically from email request!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="form-label text-muted small fw-bold">Reset Token</label>
                  <input
                    type="text"
                    className="form-control py-2 rounded-3 font-monospace"
                    style={{ fontSize: '0.9rem' }}
                    placeholder="Enter reset token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    disabled={isAutoFilled}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label text-muted small fw-bold">New Password</label>
                  <input
                    type="password"
                    className="form-control py-2 rounded-3"
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-label text-muted small fw-bold">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control py-2 rounded-3"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2.5 rounded-pill mb-3"
                  style={{ background: 'linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%)', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Update Password'}
                </button>

                <div className="text-center">
                  <Link to="/login" style={{ color: '#2d6a4f', textDecoration: 'none', fontWeight: '500' }}>
                    Cancel & Return to Login
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

export default ResetPassword;
