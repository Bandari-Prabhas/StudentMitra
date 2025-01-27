import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaApple, FaTelegramPlane, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://assets.chaminade.edu/wp-content/uploads/2023/12/06150219/Cybersecurity-Workshop_cn-header2_1600x800-1.jpg?w=640",
    "https://vipre.com/wp-content/uploads/2024/10/security-awareness-class.jpg",
    "https://set.jainuniversity.ac.in/academics/information-science-engineering/images/top-university-of-india3.jpg",
    "https://mentor-group.org/wp-content/uploads/2018/04/Communication-Skills-e1408966879321.jpg",
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);  // Adding nextSlide as a dependency

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-700 text-white min-h-screen flex flex-col"
          : "bg-white text-gray-700 min-h-screen flex flex-col"
      }
    >
      {/* Top Navbar */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-950 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 ml-32">
          <h2 className="text-lg font-semibold">Download Now:</h2>
          <IoLogoAndroid size={35} className="cursor-pointer text-green-800 rounded-full" />
          <FaApple size={35} className="cursor-pointer text-gray-900 rounded-full" />
        </div>
        <div className="flex items-center space-x-4 mr-32">
          <h2 className="text-lg font-semibold">Follow us:</h2>
          <FaTelegramPlane size={44} className="cursor-pointer rounded-full bg-blue-400 p-2" />
          <FaWhatsapp size={44} className="cursor-pointer rounded-full bg-green-500 p-2" />
          <FaYoutube size={44} className="cursor-pointer rounded-full bg-red-600 p-2" />
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="p-6 shadow-md sticky top-0 z-50 bg-opacity-90 bg-gray-300 text-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-500">Student Mitra</div>
          <nav className="flex space-x-8 text-lg font-semibold text-gray-700">
            <a href="#home" className="hover:text-blue-500">
              Home
            </a>
            <a href="#about" className="hover:text-blue-500">
              About Us
            </a>
            <a href="#workshop" className="hover:text-blue-500">
              Workshops
            </a>
            <a href="#courses" className="hover:text-blue-500">
              Our Courses
            </a>
            <a href="#mission" className="hover:text-blue-500">
              Our Mission & Vision
            </a>
          </nav>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Login/Signup
          </button>
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-3 rounded-full bg-blue-500 text-white"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Carousel Section */}
      <div className="container mx-auto my-8 relative">
        <div className="relative w-full overflow-hidden rounded-md shadow-lg h-[500px]">
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
                className={`w-4 h-4 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-blue-500" : "bg-gray-500"
                }`}
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
        <div className="flex justify-center gap-8 mt-6">
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
        <h2 className="text-4xl font-bold mb-4">Our Courses</h2>
        <div className="flex justify-center gap-8 flex-wrap mt-6">
          <div className="w-[300px] h-[400px] bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-lg flex flex-col">
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
          <div className="w-[300px] h-[400px] bg-gray-100 dark:bg-gray-800 p-6 rounded-md shadow-lg flex flex-col">
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
              <h4 className="text-xl font-bold mb-2">Quick Links</h4>
              <ul>
                <li><a href="#about" className="hover:underline">About Us</a></li>
                <li><a href="#courses" className="hover:underline">Courses</a></li>
                <li><a href="#workshop" className="hover:underline">Workshops</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Contact Us</h4>
              <p>Email: info@studentmitra.com</p>
              <p>Phone: +1-800-STUDENT</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Follow Us</h4>
              <div className="flex justify-center space-x-4">
                <FaTelegramPlane size={24} />
                <FaWhatsapp size={24} />
                <FaYoutube size={24} />
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm">&copy; 2024 Student Mitra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

