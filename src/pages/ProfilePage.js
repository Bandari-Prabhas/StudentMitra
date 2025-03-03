// ProfilePage.js (New Component)
import React, { useState } from 'react';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ userData, setUserData }) => {
  const [displayName, setDisplayName] = useState(userData?.displayName || '');
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!photoFile) return;
    
    try {
      setLoading(true);
      const fileRef = ref(storage, `profile/${userData.uid}/${photoFile.name}`);
      await uploadBytes(fileRef, photoFile);
      const downloadURL = await getDownloadURL(fileRef);

      // Update Firestore
      const userDoc = doc(db, 'users', userData.uid);
      await updateDoc(userDoc, {
        photoURL: downloadURL
      });

      // Update local state
      setUserData(prev => ({
        ...prev,
        photoURL: downloadURL
      }));
      
      // Update auth profile
      await auth.currentUser.updateProfile({
        photoURL: downloadURL
      });

      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };

  const handleNameUpdate = async () => {
    try {
      await auth.currentUser.updateProfile({
        displayName: displayName
      });
      const userDoc = doc(db, 'users', userData.uid);
      await updateDoc(userDoc, {
        displayName: displayName
      });
      setUserData(prev => ({
        ...prev,
        displayName: displayName
      }));
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Settings</h2>
        
        <div className="flex flex-col items-center mb-6">
          <img
            src={userData?.photoURL || '/default-user.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Uploading...' : 'Update Photo'}
          </button>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Display Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <button
              onClick={handleNameUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;