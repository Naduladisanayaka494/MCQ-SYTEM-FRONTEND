import React, { useState } from "react";
import { register } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Registered successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-green-100 to-lime-100">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center p-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
          alt="Register Illustration"
          className="w-3/4 max-w-sm object-contain"
        />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="bg-white w-11/12 max-w-md p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Register for Exams
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 outline-none"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-300 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
