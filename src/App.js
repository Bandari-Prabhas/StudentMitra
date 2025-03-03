// App.js (Main Router Component)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import { auth } from './firebase';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainPage 
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              userData={userData}
            />
          } 
        />
        <Route 
          path="/home" 
          element={
            <MainPage 
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode(!darkMode)}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              userData={userData}
            />
          } 
        />
        
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route 
          path="/profile" 
          element={
            <ProfilePage 
              userData={userData}
              setUserData={setUserData}
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;