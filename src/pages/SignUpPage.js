import React, { useState } from 'react';
import sm1 from '../assets/sm1.jpg';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const navigate = useNavigate();

  const handleClick = () => {
    // Add logic for sign-up success here
    // For example, after successful sign-up, navigate to SignIn page
    navigate('/signin');
  };

  // Function to get the current week days
  const getWeekDays = (date) => {
    const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i));
    }
    return days;
  };

  const weekDays = getWeekDays(new Date(currentDate));

  // Function to go to the previous week
  const handlePreviousWeek = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 7)));
  };

  // Function to go to the next week
  const handleNextWeek = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 7)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-white flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl flex w-full max-w-6xl">
        <div className="w-1/2 p-10 flex flex-col justify-between bg-gradient-to-t from-yellow-100 to-white rounded-l-3xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Create an account</h1>
          <p className="text-lg mb-6 text-gray-600">Sign up and get 30 day free trial</p>

          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="full-name">Full name</label>
              <input
                type="text"
                id="full-name"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-yellow-500"
                placeholder="Amélie Laurent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-yellow-500"
                placeholder="amélielaurent7622@gmail.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-white py-3 rounded-xl shadow-lg text-lg hover:bg-yellow-600 transition-all"
            >
              Submit
            </button>
          </form>

          <div className="flex justify-center my-6">
            <span className="text-gray-600">or</span>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="flex items-center justify-center w-12 h-12 border rounded-lg">
              <img src="https://www.svgrepo.com/show/475656/apple-color.svg" alt="Apple" className="w-6 h-6" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 border rounded-lg">
              <img src="https://www.svgrepo.com/show/475647/google-color.svg" alt="Google" className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Already have an account? 
              <button onClick={handleClick} className="text-yellow-500">Sign in</button>
            </p>
            <p className="text-sm text-gray-600">Terms & Conditions</p>
          </div>
        </div>

        {/* Right Side with Overlapping Containers and Calendar */}
        <div className="w-1/2 bg-cover bg-center rounded-r-3xl relative overflow-hidden" style={{ backgroundImage: `url(${sm1})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Single Overlay with Light Yellowish Color and Stronger Blur */}
          <div className="absolute top-10 left-10 text-white">
            <div className="bg-yellow-500 bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transition-shadow duration-300">
              <p className="font-semibold text-gray-800">Task Review With Team</p>
              <p className="text-sm text-gray-700">09:30am - 10:00am</p>
            </div>
          </div>

          {/* Glass-like Week Calendar Overlay */}
          <div className="absolute bottom-10 right-10 w-64 bg-white bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-xl hover:shadow-2xl cursor-pointer transition-shadow duration-300">
            <div className="flex justify-between mb-4">
              <button onClick={handlePreviousWeek} className="text-sm font-semibold text-gray-800">&lt;</button>
              <p className="font-semibold text-gray-800">
                {weekDays[0].toLocaleDateString('default', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleDateString('default', { month: 'long', day: 'numeric' })}
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
                    className={`text-center p-1 text-xs rounded-2xl ${isToday ? 'bg-red-400' : ' text-gray-800'}`}
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
