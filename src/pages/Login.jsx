import React, { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-100">
      {/* Left: Image section */}
      <div className="hidden md:flex w-1/2 justify-center items-center p-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201614.png" // You can replace with your preferred exam-themed image URL
          alt="Exam login"
          className="w-3/4 max-w-sm object-contain"
        />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="bg-white w-11/12 max-w-md p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Exam System Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
