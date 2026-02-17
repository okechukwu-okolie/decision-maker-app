import React, { useState } from "react";

const STORAGE_USERS = "dm_users";

const SIgnIn = ({ onSignIn, goToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignIn = () => {
    setSubmitError("");
    if (!validate()) return;
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      const users = raw ? JSON.parse(raw) : [];
      const found = users.find(
        (u) => u.email === email && u.password === password,
      );
      if (found) {
        onSignIn(found);
      } else {
        setSubmitError("Invalid email or password");
      }
    } catch (e) {
      setSubmitError("Error reading users");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">Sign In</h2>
        <label className="block mb-3 text-sm text-gray-300">
          Email
          <input
            className="block w-full mt-2 p-2 rounded-lg bg-white text-slate-900 border border-white/5"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
              setSubmitError("");
            }}
          />
          {errors.email && (
            <div className="text-red-300 text-sm mt-1">{errors.email}</div>
          )}
        </label>
        <label className="block mb-3 text-sm text-gray-300">
          Password
          <input
            type="password"
            className="block w-full mt-2 p-2 rounded-lg bg-white text-slate-900 border border-white/5"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
              setSubmitError("");
            }}
          />
          {errors.password && (
            <div className="text-red-300 text-sm mt-1">{errors.password}</div>
          )}
        </label>
        {submitError && <div className="text-red-300 mb-2">{submitError}</div>}
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-md"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="flex-1 py-3 rounded-lg border border-white/6 text-white"
            onClick={goToSignUp}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SIgnIn;
