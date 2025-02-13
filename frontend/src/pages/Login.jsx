import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { HiEyeOff } from "react-icons/hi";
import { AiFillEye } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState(false);

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, password);

    if (!name || !password) {
      alert("Please fill in both username and password.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username: name,
        password: password,
      });
       
      login(response.data.token);
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
      toast.error("can not login")
    }

    setName("");
    setPassword("");
  };

  const handleToggle = () => {
    setDisplay(!display);
  };

  return (
    <div>
      <Navbar/>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-[#CCCCCC] p-8 rounded-lg  shadow-lg w-80 sm:w-96"
        >
          <h2 className="text-2xl font-bold text-center text-[#927D6E]  mb-6">
            WELCOME BACK!
          </h2>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="username"
              className="w-full px-8 py-2 mb-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#927D6E] "
            />
            <FaUser className=" absolute left-3 top-5 transform -translate-y-1/2" />
          </div>
          <div className="relative">
            <input
              type={!display ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-8 py-2 mb-4 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#927D6E] "
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
          <button
            type="submit"
            className="w-full py-2 bg-[#927D6E] text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-[#997155] hover:bg-[] "
          >
            Login
          </button>
          <div className=" mt-4">
            <p className="mt-2 text-center">
              don't have an account?{" "}
              <Link to="/Registration" className="text-[#927D6E] font-medium  ">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster/>
    </div>
  );
};

export default Login;
