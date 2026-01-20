import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    aadhar: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Create mock user data for demo/testing
      const mockUser = {
        id: '1',
        full_name: formData.full_name,
        email: formData.email,
        mobile_number: formData.mobile_number,
        aadhar: formData.aadhar
      };

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log('Navigating to dashboard...');
      // Navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Signup error:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-box">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join LoanSewa for instant loan approvals</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="12-digit Aadhar"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="login-prompt">
              <span>Already have an account? </span>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="login-link"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
