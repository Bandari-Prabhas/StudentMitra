import React, { useState } from 'react';
import sm1 from '../assets/sm1.jpg';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle } from "react-icons/fa";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
import { db, auth, provider } from '../firebase';  // Updated import

// Firebase configuration


const SignUpPage = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    navigate('/signin');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const q = query(collection(db, "users"), where("email", "==", formData.email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setError("Email address already in use!");
        setLoading(false);
        return;
      }

      const docRef = await addDoc(collection(db, "users"), {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: serverTimestamp(),
        lastLogin: null
      });
      
      console.log("Document written with ID: ", docRef.id);
      navigate('/signin');
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error.message || "Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(usersRef, {
          fullName: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
      }

      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError("Google sign-in failed. Please try again.");
    }
  };

  const getWeekDays = (date) => {
    const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i));
    }
    return days;
  };

  const weekDays = getWeekDays(new Date(currentDate));

  const handlePreviousWeek = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-white flex items-center justify-center p-4 font-sans">
      <div className="bg-white shadow-xl rounded-3xl flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-gradient-to-t from-yellow-100 to-white rounded-t-3xl md:rounded-l-3xl">
          <div>
            <h1 className="text-3xl font-bold mb-6 text-yellow-800 font-serif">Create an account</h1>
            <p className="text-lg mb-6 text-yellow-700">Sign up and get 30 day free trial</p>

            {error && <p className="text-red-500 text-center font-semibold text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-yellow-800" htmlFor="fullName">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-3 border-2 border-yellow-100 rounded-xl focus:outline-none focus:border-yellow-400 placeholder-yellow-300"
                  placeholder="Amélie Laurent"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-yellow-800" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border-2 border-yellow-100 rounded-xl focus:outline-none focus:border-yellow-400 placeholder-yellow-300"
                  placeholder="amélielaurent7622@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-yellow-800" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border-2 border-yellow-100 rounded-xl focus:outline-none focus:border-yellow-400 placeholder-yellow-300"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-yellow-900 py-3 rounded-xl shadow-lg text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 disabled:bg-yellow-300"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Get Started →'}
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-yellow-200"></div>
              <span className="px-4 text-yellow-600 text-sm">or continue with</span>
              <div className="flex-1 border-t border-yellow-200"></div>
            </div>

            <div className="flex justify-center space-x-4 mb-8">
              <button className="flex items-center justify-center w-12 h-12 border-2 border-yellow-100 rounded-lg hover:bg-yellow-50 transition-colors">
                <FaApple className="w-6 h-6 text-yellow-800" />
              </button>
              <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-12 h-12 border-2 border-yellow-100 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                <FaGoogle className="w-6 h-6 text-yellow-800" />
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-yellow-700">
              Already have an account?{" "}
              <button onClick={handleClick} className="text-yellow-600 font-semibold hover:text-yellow-800">
                Sign in
              </button>
            </p>
            <p className="text-xs mt-2 text-yellow-500">By continuing, you agree to our Terms & Conditions</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-cover bg-center rounded-b-3xl md:rounded-r-3xl relative overflow-hidden" style={{ backgroundImage: `url(${sm1})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Calendar Widget */}
          <div className="absolute top-10 left-10 text-white">
            <div className="bg-yellow-500 bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transition-shadow duration-300">
              <p className="font-semibold text-yellow-100">Task Review With Team</p>
              <p className="text-sm text-yellow-200">09:30am - 10:00am</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="absolute bottom-10 right-10 w-64 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transition-shadow duration-300">
            <div className="flex justify-between mb-4">
              <button onClick={handlePreviousWeek} className="text-sm font-semibold text-yellow-800 hover:text-yellow-600">
                &lt;
              </button>
              <p className="font-semibold text-yellow-800">
                {weekDays[0].toLocaleDateString('default', { month: 'short', day: 'numeric' })} -{" "}
                {weekDays[6].toLocaleDateString('default', { month: 'short', day: 'numeric' })}
              </p>
              <button onClick={handleNextWeek} className="text-sm font-semibold text-yellow-800 hover:text-yellow-600">
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-yellow-800">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={index} className="text-center text-sm font-bold">
                  {day}
                </div>
              ))}
              {weekDays.map((day, index) => {
                const isToday = day.toDateString() === today.toDateString();
                return (
                  <div
                    key={index}
                    className={`text-center p-1 text-xs rounded-2xl ${
                      isToday ? 'bg-yellow-400 text-white' : 'bg-yellow-100 bg-opacity-50'
                    }`}
                  >
                    {day.getDate()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;