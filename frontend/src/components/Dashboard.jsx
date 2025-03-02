import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogsByUser = async () => {
    try {
      const response = await axios("http://localhost:3000/api/getMyBlogs", {
        withCredentials: true,
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogsByUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Blogs</h1>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Link to="/" className="block p-6">
                  {item.banner && (
                    <img
                      src={item.banner}
                      alt="Banner"
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-900 mt-4">{item.title}</h2>
                  <p className="text-gray-700 mt-2 line-clamp-3">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags &&
                      item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;