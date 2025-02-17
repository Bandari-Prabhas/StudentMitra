import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/MainPage'; // Import the MainPage component
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div
        className={
          darkMode
            ? "dark bg-gray-700 text-white min-h-screen flex flex-col"
            : "bg-white text-gray-700 min-h-screen flex flex-col"
        }
      >
        <Routes>
          <Route
            path="/"
            element={<MainPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route
            path="/signup"
            element={<SignUpPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;