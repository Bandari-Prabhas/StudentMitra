// App.jsx
import React, { useState } from "react";
import MainPage from './pages/MainPage' // Import the MainPage component

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-700 text-white min-h-screen flex flex-col"
          : "bg-white text-gray-700 min-h-screen flex flex-col"
      }
    >
      <MainPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default App;
