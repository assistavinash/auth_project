import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
  const { name, value } = e.target;

    const copyRegisterInfo = {...registerInfo};
    copyRegisterInfo[name] = value;
    setRegisterInfo(copyRegisterInfo);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = registerInfo;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

try {
  const url = import.meta.env.VITE_API_URL + "/auth/register"; // ✅ correct
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerInfo)
  });

  const result = await response.json();
  const { success, message, error } = result;

  if (success) {
    handleSuccess(message);
    setTimeout(() => navigate("/login"), 1000);
  } else if (error) {
    const details = error?.details[0].message;
    handleError(details);
  } else if (!success) {
    handleError(message);
  }

  
} catch (err) {
  handleError(err.message || "Something went wrong");
}

  };

  return (
    <div className='container mx-auto p-4'>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name  
          </label>
          <input
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            autoFocus
            value={registerInfo.name}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            className="form-input mt-1 block w-full text-black"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={registerInfo.email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={registerInfo.password}
          />
        </div>

        <button className="btn btn-blue" type="submit">Register</button>
        <span className="ml-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
