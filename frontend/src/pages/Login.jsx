import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = import.meta.env.VITE_API_URL + "/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(message || "Login failed");
      }
    } catch (err) {
      handleError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={handleChange}
            className="form-input mt-1 block w-full text-black border p-2 rounded"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={loginInfo.email}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={handleChange}
            className="form-input mt-1 block w-full border p-2 rounded"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={loginInfo.password}
          />
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Login
        </button>
        <span className="ml-2">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
