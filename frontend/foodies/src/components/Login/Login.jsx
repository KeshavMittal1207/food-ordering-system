import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../service/authService';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(data);
      if (response?.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authEmail', response.email);
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error('Login failed. Invalid response from server.');
      }
    } catch (error) {
      toast.error('Unable to login. Please check credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form onSubmit={onSubmitHandler}>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={onChangeHandler} value={data.email} required />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChangeHandler} value={data.password} required />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="d-grid">
                  <button className="btn btn-outline-primary btn-login text-uppercase" type="submit">Sign in</button>
                  <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Reset</button>
                </div>
                <div className="mt-4">
                  Don't have an account? <Link to="/register">Sign Up</Link>
                </div>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
