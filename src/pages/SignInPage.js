import React, { useState } from 'react';
import sm1 from '../assets/sm1.jpg';
import { useNavigate } from 'react-router-dom';
import { FaApple, FaGoogle } from "react-icons/fa";
import { auth, provider, db } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const SignInPage = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    navigate('/signup');
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
     setError('');
   
     try {
       const usersRef = collection(db, "users");
       const q = query(usersRef, where("email", "==", formData.email));
       const querySnapshot = await getDocs(q);
   
       if (!querySnapshot.empty) {
         const userDoc = querySnapshot.docs[0].data();
   
         if (userDoc.password === formData.password) {
           // Successful login
           console.log("User Logged In:", userDoc);
   
           // Update last login timestamp
           const docRef = querySnapshot.docs[0].ref;
           await updateDoc(docRef, { lastLogin: serverTimestamp() });
   
           navigate('/home');
         } else {
           setError('Incorrect password. Please try again.');
         }
       } else {
         setError('No account found with this email.');
       }
     } catch (err) {
       console.error("Login error:", err);
       setError('An error occurred. Please try again later.');
     } finally {
       setLoading(false);
     }
   };
   
   const handleGoogleSignIn = async () => {
     setLoading(true);
     setError('');
   
     try {
       const result = await signInWithPopup(auth, provider);
       const user = result.user;
   
       const usersRef = collection(db, "users");
       const q = query(usersRef, where("uid", "==", user.uid));
       const querySnapshot = await getDocs(q);
   
       if (querySnapshot.empty) {
         await addDoc(usersRef, {
           uid: user.uid,
           email: user.email,
           displayName: user.displayName,
           photoURL: user.photoURL,
           lastLogin: serverTimestamp(),
           createdAt: serverTimestamp()
         });
       } else {
         const docRef = querySnapshot.docs[0].ref;
         await updateDoc(docRef, {
           lastLogin: serverTimestamp()
         });
       }
   
       navigate('/home');
     } catch (err) {
       console.error("Google Sign-In error:", err);
       setError('An error occurred. Please try again.');
     } finally {
       setLoading(false);
     }
   };
   
  // Calendar functions
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between bg-gradient-to-t from-yellow-100 to-white rounded-t-3xl md:rounded-l-3xl">
          <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back</h1>
            <p className="text-lg mb-6 text-gray-600">Sign in to continue your journey</p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-yellow-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-yellow-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-3 rounded-xl shadow-lg text-lg hover:bg-yellow-600 transition-all disabled:bg-yellow-300"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="flex justify-center my-6">
              <span className="text-gray-600">or</span>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="flex items-center justify-center w-12 h-12 border rounded-lg">
                <FaApple className="w-6 h-6 text-black" />
              </button>

              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center justify-center w-12 h-12 border rounded-lg hover:bg-gray-50"
              >
                <FaGoogle className="w-6 h-6 text-yellow-800" />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <button onClick={handleClick} className="text-yellow-500 ml-1">Sign up</button>
            </p>
            <p className="text-sm text-gray-600 mt-2">Forgot Password?</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-cover bg-center rounded-b-3xl md:rounded-r-3xl relative overflow-hidden" style={{ backgroundImage: `url(${sm1})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="absolute top-10 left-10 text-white">
            <div className="bg-yellow-500 bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transition-shadow duration-300">
              <p className="font-semibold text-gray-800">Daily Standup Meeting</p>
              <p className="text-sm text-gray-700">10:00am - 10:30am</p>
            </div>
          </div>

          <div className="absolute bottom-10 right-10 w-64 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transition-shadow duration-300">
            <div className="flex justify-between mb-4">
              <button onClick={handlePreviousWeek} className="text-sm font-semibold text-gray-800">&lt;</button>
              <p className="font-semibold text-gray-800">
                {weekDays[0].toLocaleDateString('default', { month: 'long', day: 'numeric' })} -{' '}
                {weekDays[6].toLocaleDateString('default', { month: 'long', day: 'numeric' })}
              </p>
              <button onClick={handleNextWeek} className="text-sm font-semibold text-gray-800">&gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-gray-600">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={index} className="text-center text-sm font-bold">{day}</div>
              ))}
              {weekDays.map((day, index) => {
                const isToday = day.toDateString() === today.toDateString();
                return (
                  <div
                    key={index}
                    className={`text-center p-1 text-xs rounded-2xl ${isToday ? 'bg-red-400' : 'text-gray-800'}`}
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

export default SignInPage;