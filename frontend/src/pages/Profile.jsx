import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ fullname: "", email: "" });

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        withCredentials: true,
      });
      setUser(response.data);
      setFormData({ fullname: response.data.fullname, email: response.data.email });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/update",
        formData,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully!");
      setUser(response.data.user);
      setEditing(false);
    } catch (error) {
      toast.error("Error updating profile.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        {user ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
            <div className="relative w-32 h-32 mx-auto">
              <img
                src="profile.png"
                className="w-full h-full object-cover rounded-full border-4 border-gray-300 shadow-md"
                alt="User Profile"
              />
            </div>

            {editing ? (
              <div className="mt-4">
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-2"
                />
                <button
                  onClick={handleSave}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mt-4">Full Name: {user.fullname}</h2>
                <p className="text-gray-500">Username: {user.username}</p>
                <p className="text-gray-600 mt-2">Email: {user.email}</p>
                <p className="text-gray-600 mt-2">Total Blogs: {user.totalBlogs}</p>

                <button
                  onClick={handleEditClick}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading user...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
