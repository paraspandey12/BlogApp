import  { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiEyeOff } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify"; 
import Navbar from "../components/Navbar";


const Registration = () => {
  const [display, setDisplay] = useState(false);
  const [formData, setFormData] = useState({
  
    fullname: "",
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setDisplay(!display);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { fullname, email, password } = formData;

    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!fullname || !email || !password) {
      toast.error("All fields are required!");
      return false;
    }

    if (fullname.length < 3) {
      toast.error("fullname must be at least 3 characters long!");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character!"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating user");
      }

      const result = await response.json();
      console.log(result);
      setFormData({
        fullname: "",
        email: "",
        password: "",
      });
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center mt-0 h-screen ">
        <form
          className="w-80 sm:w-96 bg-[#CCCCCC] rounded-lg shadow-lg p-9 m-16 pt-10 mt-0"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-[#927D6E] mb-6">
            JOIN US TODAY!
          </h2>

          <div className="relative">
            <input
              className="w-full pl-7 rounded-lg border border-gray-300 px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#927D6E] text-black"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder=" fullname"
            />
            <FaUser className="absolute left-3 top-5 transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <input
              className="w-full pl-8 rounded-lg border border-gray-300 px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#927D6E] text-black"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <MdEmail className="absolute left-3 top-5 transform -translate-y-1/2" />
          </div>

          <div className="relative">
            <input
              className="w-full pl-8 rounded-lg border border-gray-300 px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#927D6E] text-black"
              type={!display ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
            />
            <RiLockPasswordFill className="absolute left-3 top-5 transform -translate-y-1/2 " />
            {display ? (
              <AiFillEye
                className="absolute right-3 top-3 "
                onClick={handleToggle}
              />
            ) : (
              <HiEyeOff
                onClick={handleToggle}
                className="absolute right-3 top-3  "
              />
            )}
          </div>

          <button className="w-full rounded-lg py-2 my-6 bg-[#927D6E] text-white hover:bg-[#927D6E] focus:outline-none focus:ring-2 focus:ring-[#927D6E]">
            Register
          </button>

          <p className="m-2 text-center" >
            Already have an account?{" "}
            <Link to="/Login" className="text-[#927D6E] font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>

     
      <ToastContainer />
    </div>
  );
};

export default Registration;
