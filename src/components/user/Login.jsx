import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../user/UserProfile";
import { MdWifi, MdAccessibilityNew, MdPowerSettingsNew } from "react-icons/md";

function Login({ toggleLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  localStorage.setItem("name", name);

  const COMMON_PASSWORDS = [
    "1234", "1111", "0000", "12345", "123456",
    "password", "qwerty", "12345678", "123456789",
    "111111", "123123", "987654321", "admin", "1234567"
  ];

  async function login(e) {
    e.preventDefault();
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
      setError("Developer cares about privacy! Please choose a different password.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    
    localStorage.setItem("password", password);
    try {
      setLoading(true);
      // Simulating a delay for demonstration purposes
      setTimeout(() => {
        navigate(`/${name}`);
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  }

  return (
    <>

      <form onSubmit={login}>
        <div className="flex flex-col items-center z-10">
          <div className="aspect-square w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 -ml-3">
            <UserProfile name={name} />
          </div>
          <input
            className="my-3 sm:my-4 md:my-5 text-xl sm:text-2xl md:text-3xl text-white bg-transparent text-center outline-none w-64 sm:w-80 md:w-96"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username here"
            required
          />

          {loading ? (
            <div className="mt-4">
              <div className="inline-block animate-spin rounded-full border-4 border-solid border-white border-e-transparent h-8 w-8">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full max-w-xs">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className={`input bg-opacity-30 w-full focus:outline-none border-[0.5px] mt-2 sm:mt-3 md:mt-4 placeholder-white opacity-100::placeholder text-sm sm:text-base ${error ? 'border-red-500' : 'border-b-white'}`}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  autoComplete="current-password"
                />
                {!loading && error && (
                  <div className="absolute top-full mt-2 left-2 bg-white text-black text-xs px-3 py-2 rounded shadow-md border border-gray-300 z-50 whitespace-nowrap animate-fade-in flex items-center">
                    <div className="absolute -top-1.5 left-4 w-3 h-3 bg-white border-t border-l border-gray-300 transform rotate-45"></div>
                    <span className="relative z-10 font-sans">
                      <span className="text-red-600 font-bold mr-1">ⓘ</span>
                      {error}
                    </span>
                  </div>
                )}
              </div>
              <div
                className="text-white mt-3 text-sm btn btn-ghost hover:text-black tooltip tooltip-bottom flex w-auto"
                onClick={toggleLogin}
                data-tip="You can log in by typing anything into the input fields and pressing enter—no credentials needed!"
              >
                I forgot my PIN
              </div>
            </>
          )}

          <button
            type="submit"
            className="hidden btn bg-blue-500 text-white mt-4 px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
      <div className="absolute flex gap-4 sm:gap-6 md:gap-9 text-white bottom-3 sm:bottom-4 md:bottom-5 right-6 sm:right-9 md:right-12 select-none">
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdWifi />
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdAccessibilityNew />
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdPowerSettingsNew />
        </span>
      </div>
    </>
  );
}

export default Login;
