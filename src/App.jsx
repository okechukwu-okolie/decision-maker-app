import "./index.css";
import React, { useEffect, useState } from "react";
import UserInput from "./pages/UserInput";
import SIgnIn from "./pages/SIgnIn";
import SIgnUp from "./pages/SIgnUp";
import Groups from "./pages/Groups";

const SPLASH_SECONDS = 5;

function App() {
  const [route, setRoute] = useState("splash"); // splash, auth, app
  const [authView, setAuthView] = useState("signin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem("dm_currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      alert(e.message);
    }
  });

  useEffect(() => {
    if (route === "splash") {
      const t = setTimeout(() => setRoute("auth"), SPLASH_SECONDS * 1000);
      return () => clearTimeout(t);
    }
  }, [route]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("dm_currentUser", JSON.stringify(currentUser));
      setRoute("app");
    } else {
      localStorage.removeItem("dm_currentUser");
    }
  }, [currentUser]);

  const handleSignIn = (user) => setCurrentUser(user);
  const handleSignUp = (user) => setCurrentUser(user);
  const handleSignOut = () => {
    setCurrentUser(null);
    setRoute("auth");
    setAuthView("signin");
  };

  // Splash UI
  if (route === "splash") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-orange-400 mb-2 animate-pulse">
            PRIORITY APP
          </h1>
          <p className="text-gray-300">Make the important choices first</p>
        </div>
      </div>
    );
  }

  // Auth UI
  if (!currentUser) {
    return (
      <div>
        {authView === "signin" ? (
          <SIgnIn
            onSignIn={handleSignIn}
            goToSignUp={() => setAuthView("signup")}
          />
        ) : (
          <SIgnUp
            onSignUp={handleSignUp}
            goToSignIn={() => setAuthView("signin")}
          />
        )}
      </div>
    );
  }

  // App UI when signed in
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 relative">
        <div className="flex items-center gap-4">
          <div className="text-xl font-extrabold text-orange-400">
            PRIORITY APP
          </div>
          <nav className="hidden md:flex gap-2">
            <button
              className="px-3 py-2 rounded-lg bg-white/3 text-white"
              onClick={() => {
                setRoute("app");
                setMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              className="px-3 py-2 rounded-lg bg-white/3 text-white"
              onClick={() => {
                setRoute("groups");
                setMobileMenuOpen(false);
              }}
            >
              Groups
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-gray-300 mr-2">
            Hi, {currentUser.name || currentUser.email}
          </div>
          <button
            className="hidden md:inline-block px-3 py-2 rounded-lg bg-white/3 text-white"
            onClick={handleSignOut}
          >
            Sign out
          </button>

          <button
            className="md:hidden p-2 rounded-lg bg-white/5"
            onClick={() => setMobileMenuOpen((s) => !s)}
            aria-label="Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute right-4 top-16 bg-[#071327] border border-white/6 rounded-lg p-3 w-44 z-40 md:hidden">
            <button
              className="block w-full text-left px-3 py-2 rounded hover:bg-white/3"
              onClick={() => {
                setRoute("app");
                setMobileMenuOpen(false);
              }}
            >
              Home
            </button>
            <button
              className="block w-full text-left px-3 py-2 rounded hover:bg-white/3"
              onClick={() => {
                setRoute("groups");
                setMobileMenuOpen(false);
              }}
            >
              Groups
            </button>
            <button
              className="block w-full text-left px-3 py-2 rounded text-red-300 hover:bg-white/3"
              onClick={() => {
                handleSignOut();
                setMobileMenuOpen(false);
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </header>

      <main>
        {route === "app" && <UserInput currentUser={currentUser} />}
        {route === "groups" && <Groups currentUser={currentUser} />}
      </main>
    </div>
  );
}

export default App;
