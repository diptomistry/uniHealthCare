import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = ({ isSignUpMode, openForm }) => {
 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.post('login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      login(response);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={`flex items-center justify-center transition-all duration-[0.2s] delay-[0.7s] overflow-hidden col-[1_/_2] row-[1_/_2] px-20 py-0 z-20 max-md:px-6 max-md:py-0 ${
      isSignUpMode ? "opacity-0 z-10" : ""
    }`}>
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-textColor md:text-2xl">
          Sign in to your account
        </h1>
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
              type="password"
              name="password"
              id="password"
              className="bg-[#d5f2ec] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pl-10 p-2.5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 accent-brightColor  "  />
              <label htmlFor="remember" className="ml-3 text-sm text-gray-500">Remember me</label>
            </div>
            <button type="button" onClick={openForm} className="text-sm font-medium text-brightColor hover:text-hoverColor hover:underline">
              Forgot password?
            </button>
          </div>
         <Link to="/dashboard/Home">
         <button type="submit" className="w-full mt-8 text-white bg-brightColor hover:bg-hoverColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Sign in
          </button>
            </Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;
