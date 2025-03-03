import React, { useState, useEffect, useCallback } from "react";
import {
  FaSun,
  FaMoon,
  FaApple,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
  FaUserCircle,
} from "react-icons/fa";
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { IoLogoAndroid } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import smLogo from '../assets/sm.png';
import userIcon from '../assets/user-icon.png'; // Add your user icon image
import { useNavigate } from 'react-router-dom';

const MainPage = ({ darkMode, toggleDarkMode, isLoggedIn, onLogout, userData }) => {
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthClick = () => {
    navigate(isLoggedIn ? '/profile' : '/signup');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

    const handleAuthNavigation = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/signin');
    }
  };
  const handleLogout = () => {
    onLogout();
    setShowDropdown(false);
    navigate('/');
  };
  const handleLoginSignup = () => {
    navigate('/signup');
  };

  const images = [
    "https://assets.chaminade.edu/wp-content/uploads/2023/12/06150219/Cybersecurity-Workshop_cn-header2_1600x800-1.jpg?w=640",
    "https://vipre.com/wp-content/uploads/2024/10/security-awareness-class.jpg",
    "https://set.jainuniversity.ac.in/academics/information-science-engineering/images/top-university-of-india3.jpg",
    "https://mentor-group.org/wp-content/uploads/2018/04/Communication-Skills-e1408966879321.jpg",
  ];

  const nextSlide = useCallback(
    () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length),
    [images.length]
  );

  const prevSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div>
      {/* Top Navbar */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-950 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 ml-8">
          <h2 className="text-lg font-semibold">Download Now:</h2>
          <IoLogoAndroid size={35} className="cursor-pointer text-green-800 rounded-full" />
          <FaApple size={35} className="cursor-pointer text-gray-900 rounded-full" />
        </div>
        <div className="flex items-center space-x-4 mr-8">
          <h2 className="text-lg font-semibold">Follow us:</h2>
          <FaTelegramPlane size={44} className="cursor-pointer rounded-full bg-blue-400 p-2" />
          <FaWhatsapp size={44} className="cursor-pointer rounded-full bg-green-500 p-2" />
          <FaYoutube size={44} className="cursor-pointer rounded-full bg-red-600 p-2" />
        </div>
      </div>

      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <header className="p-6 shadow-md sticky top-0 z-50 bg-opacity-90 bg-gray-300 text-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src={smLogo} alt="Student Mitra Logo" className="h-16 w-[150px]" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-2xl font-semibold text-gray-700">
          <a href="#home" className="hover:text-blue-500">Home</a>
          <a href="#about" className="hover:text-blue-500">About Us</a>
          <a href="#workshop" className="hover:text-blue-500">Workshops</a>
          <a href="#courses" className="hover:text-blue-500">Courses</a>
          <a href="#mission" className="hover:text-blue-500">Our Mission & Vision</a>
        </nav>

        {/* Mobile Menu Icon */}
        <AiOutlineMenu 
          size={30} 
          className="md:hidden cursor-pointer" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-gray-300 text-gray-700 p-4 flex flex-col space-y-4 text-xl">
            <a href="#home" className="hover:text-blue-500">Home</a>
            <a href="#about" className="hover:text-blue-500">About Us</a>
            <a href="#workshop" className="hover:text-blue-500">Workshops</a>
            <a href="#courses" className="hover:text-blue-500">Courses</a>
            <a href="#mission" className="hover:text-blue-500">Our Mission & Vision</a>
          </div>
        )}

        {/* Authentication and Dark Mode */}
        <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <img src={user.photoURL || "/default-user.png"} alt="User" className="h-10 w-10 rounded-full" />
              <span className="hidden md:inline">{user.displayName || "User"}</span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <button
                  onClick={() => navigate("/profile")}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white w-full text-left"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/signin')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Login/Signup
          </button>
        )}
      </div>
    </div>
    </header>
      {/* Carousel Section */}
      <div className="container mx-auto my-8 relative">
        <div className="relative w-full overflow-hidden rounded-md shadow-lg h-[300px] sm:h-[400px] lg:h-[500px]">
          <img
            src={images[currentIndex]}
            alt={`carousel-slide-${currentIndex}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg opacity-50 hover:opacity-100"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg opacity-50 hover:opacity-100"
          >
            &gt;
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full cursor-pointer ${currentIndex === index ? "bg-blue-500" : "bg-gray-500"}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="container mx-auto p-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Join Us</h2>
        <p className="mt-4 text-gray-900 dark:text-gray-800">
          Learn and grow with our free and paid workshops.
        </p>
        <div className="flex justify-center gap-8 mt-6 flex-wrap">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Join Student Ambassadors
          </button>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Request Workshop Now
          </button>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="container mx-auto p-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Courses</h2>
        <div className="flex justify-center gap-8 flex-wrap mt-6">
          <div className="w-[300px] h-[400px] bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-lg flex flex-col cursor-pointer">
            <img
              src="https://www.ecomm-guru.com/wp-content/uploads/2023/05/course_offered.jpg"
              alt="Course 1"
              className="w-full h-[200px] object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Course 1</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow">
              Learn the basics of coding.
            </p>
          </div>
          <div className="w-[300px] h-[400px] bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-lg flex flex-col cursor-pointer">
            <img
              src="https://blog.ipleaders.in/wp-content/uploads/2021/05/online-course-blog-header.jpg"
              alt="Course 2"
              className="w-full h-[200px] object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">Course 2</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow">
              Advanced machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-700 p-8 text-center mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold">Useful Links</h4>
              <ul className="list-none">
                <li>Blog</li>
                <li>Workshop</li>
                <li>Meetups</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Support</h4>
              <ul className="list-none">
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Follow Us</h4>
              <div className="flex space-x-4 justify-center">
                <FaTelegramPlane size={35} />
                <FaWhatsapp size={35} />
                <FaYoutube size={35} />
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm mt-4">© 2025 Student Mitra. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainPage;
