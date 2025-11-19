
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuthStore } from "../store";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API().signup(email, password);

    if (res.token) {
      setToken(res.token);
      navigate("/todos");
    } else alert(res.error || "Signup failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Signup
        </h2>

        <div className="space-y-1">
          <label className="text-gray-600 font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-600 font-medium">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Create Account
        </button>

        <p className="text-center text-gray-600 text-sm pt-2">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
