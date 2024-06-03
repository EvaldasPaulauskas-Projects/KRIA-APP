import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../service/UserService/UserService";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(formData.email, formData.password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/dashboard");
        window.location.reload();
      } else {
        setError(userData.message);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-poppins">
      <div className="flex flex-1 items-center justify-center bg-[#12172B]">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl text-white font-bold mb-6 text-center">Sign in to dashboard</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary transition duration-300"
                placeholder="Type your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent border-b-2 border-gray-300 w-full py-2 px-3 text-white placeholder-gray-400 leading-tight focus:outline-none focus:border-primary transition duration-300"
                placeholder="Type your password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className=" w-full bg-[#4661E6] hover:bg-blue-700 text-white font-bold py-2 mt-2 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
            {error && <p className="mt-4 text-red-500 text-xs italic">{error}</p>}
          </form>
          <p className="text-center text-gray-500 text-xs mt-12">
            Don't have an account? <a className="text-blue-400" href="/register">Register here</a>
          </p>
        </div>
      </div>
      <div className="flex flex-1 bg-[#2E3A59] items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-200">Be inspired by designers around the globe</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
