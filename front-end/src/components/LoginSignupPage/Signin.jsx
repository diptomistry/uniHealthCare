import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../services/auth/UserProvider';
import { LuEye, LuEyeOff } from "react-icons/lu";

const Signin = ({ isSignUpMode, openForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const { login } = useContext(UserContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUserType(data.data.role.roleName);

        login(data.data); 
        localStorage.setItem('token', data.data.token);

        if (rememberMe) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (userType==='admin') {
      navigate('/dashboard/Medical-Center');
    }
    else if (userType==='doctor') {
      navigate('/dashboard/doctor-home');
    }
    else if (userType==='staff') {
      navigate('/dashboard/staff-home');
    }
    else if (userType==='student') {
      navigate('/dashboard/Student-Home');
    }
    else if (userType==='dispensary officer') {
      navigate('/dashboard/dispensary-home');
    }
    else if (userType==='senior officer') {
      navigate('/dashboard/senior-officer-home');
    }
    else if (userType==='teacher') {
      navigate('/dashboard/teacher-home');
    }

  }, [userType, navigate]);

  return (
    <div
      className={`flex items-center justify-center transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0 z-20 max-md:px-6 max-md:py-0 ${
        isSignUpMode ? 'opacity-0 z-10' : ''
      }`}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-textColor md:text-2xl">
          Sign in to your account
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <i className="fa fa-envelope absolute inset-y-0 left-0 pl-3 py-3 text-gray-500"></i>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <i className="fa fa-lock absolute inset-y-0 left-0 pl-3 py-3 text-gray-500"></i>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              id="password"
              className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <LuEyeOff className="text-gray-500" />
              ) : (
                <LuEye className="text-gray-500" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-brightColor"
              />
              <label htmlFor="remember" className="ml-3 text-sm text-gray-500">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={openForm}
              className="text-sm font-medium text-brightColor hover:text-hoverColor hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-8 text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
