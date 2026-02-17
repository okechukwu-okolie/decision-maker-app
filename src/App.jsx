import "./index.css";
import React, { useEffect, useState } from "react";
import UserInput from "./pages/UserInput";
import SIgnIn from "./pages/SIgnIn";
import SIgnUp from "./pages/SIgnUp";
import Groups from "./pages/Groups";

const SPLASH_SECONDS = 7;

function App() {
  const [route, setRoute] = useState("splash"); // splash, auth, app
  const [authView, setAuthView] = useState("signin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const t = localStorage.getItem("dm_theme");
      if (t) return t;
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch (e) {
      return "light";
    }
  });
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

  useEffect(() => {
    try {
      localStorage.setItem("dm_theme", theme);
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Splash UI
  if (route === "splash") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img
            src="/priority-app-logo.png"
            alt="Priority App"
            className="mx-auto mb-4 w-56 h-auto md:w-72 animate-pulse"
          />
          <p className="text-lg font-semibold text-gray-500">
            Make the important choices first
          </p>
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
          <div className="flex items-center gap-2">
            <img
              src="/priority-app-logo.png"
              alt="Priority App"
              className="h-8 w-auto"
            />
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
            className="px-2 py-1 rounded-md bg-white/5 text-white"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2" />
                <path d="M12 21v2" />
                <path d="M4.22 4.22l1.42 1.42" />
                <path d="M18.36 18.36l1.42 1.42" />
                <path d="M1 12h2" />
                <path d="M21 12h2" />
                <path d="M4.22 19.78l1.42-1.42" />
                <path d="M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>

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
              className="block w-full text-left px-3 py-2 rounded hover:bg-white/3"
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
            >
              Toggle theme
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
