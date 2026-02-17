import React, { useState } from "react";

const STORAGE_USERS = "dm_users";

const SIgnUp = ({ onSignUp, goToSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!email || !password) return alert("Provide email and password");
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      const users = raw ? JSON.parse(raw) : [];
      if (users.find((u) => u.email === email)) return alert("User exists");
      const user = { name, email, password };
      users.push(user);
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
      onSignUp(user);
    } catch (e) {
      alert("Error saving user");
    }
  };

  const handleSkip = () => {
    try {
      const rawCurrent = localStorage.getItem("dm_currentUser");
      if (rawCurrent) {
        const user = JSON.parse(rawCurrent);
        onSignUp && onSignUp(user);
        return;
      }
      const raw = localStorage.getItem(STORAGE_USERS);
      const users = raw ? JSON.parse(raw) : [];
      if (users && users.length > 0) {
        goToSignIn && goToSignIn();
        return;
      }
      alert("No existing account found. Please create one.");
    } catch (e) {
      alert("Error checking existing sign-in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-[rgba(255,255,255,0.02)] border border-white/5 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">
          Create Account
        </h2>
        <label className="block mb-3 text-sm text-gray-300">
          Name
          <input
            className="block w-full mt-2 p-2 rounded-lg bg-white text-slate-900 border border-white/5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block mb-3 text-sm text-gray-300">
          Email
          <input
            className="block w-full mt-2 p-2 rounded-lg bg-white text-slate-900 border border-white/5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-3 text-sm text-gray-300">
          Password
          <input
            type="password"
            className="block w-full mt-2 p-2 rounded-lg bg-white text-slate-900 border border-white/5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="flex gap-3 mt-4">
          <button
            className="flex-1 py-3 rounded-lg bg-orange-500 text-white font-semibold shadow-md"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="flex-1 py-3 rounded-lg border border-white/6 text-white"
            onClick={goToSignIn}
          >
            Back to sign in
          </button>
        </div>
        <div className="mt-4">
          <button
            className="w-full py-3 rounded-lg border border-white/6 text-white"
            onClick={handleSkip}
          >
            Skip — I already have an account / previously signed in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SIgnUp;
