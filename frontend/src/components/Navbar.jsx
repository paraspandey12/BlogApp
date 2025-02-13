import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Toaster, toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { authtoken, logout } = useContext(AuthContext);

  const [userNav, setUserNav] = useState(false);
  const userNavRef = useRef(null);

  const handleUserclick = () => {
    setUserNav((currentVal) => !currentVal);
  };

  const handleOutsideClick = (e) => {
    if (userNavRef.current && !userNavRef.current.contains(e.target)) {
      setUserNav(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleWriteClick = () => {
    if (authtoken) {
      navigate("/Editor");
    } else {
      navigate("/Login");
      toast("login first!");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };
  return (
   <>
    <div className=" flex justify-between items-center pb-1 p-3">
      <div className="flex items-center">
        <Link to="/">
          <img className="w-24 h-auto" src="/download.png" alt="logo" />
        </Link>
        <div className="relative">
          <input
            className={`pl-10 py-2 bg-gray-200 rounded-full transition-all duration-300 ease-in-out ${
              isInputVisible ? "w-60 md:w-80" : "w-0 md:w-80"
            }` }
            type="text"
            placeholder="Search"
          />
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            onClick={toggleInput}
          />
        </div>
      </div>

      {authtoken ? (
        <>
          <div className="flex mr-3 justify-between items-center">
            <div>
              <button onClick={handleWriteClick}>
                <TfiWrite className="w-10 h-6 hover:scale-110" />
              </button>
            </div>
            <div className="bg-transparent border-gray-100 mx-8 bg-slate-200">
              <IoIosNotificationsOutline className="w-8 h-auto " />
            </div>
            <img
              src="user.png"
              alt="user"
              className="w-8 h-auto"
              onClick={handleUserclick}
            />
          </div>
        </>
      ) : (
        <>
          <div className="md:flex items-center justify-evenly">
            <div>
              <div className="hidden md:block">
                <button
                  onClick={handleWriteClick}
                  className="relative p-3 px-4 border border-transparent bg-gray-100 rounded-full sm:mb-0 sm:mr-8"
                >
                  Write
                </button>
                <TfiWrite className="top-12 absolute" />
              </div>
            </div>
            <Link
              to="/Login"
              className="border rounded-full border-black bg-black text-white hover:bg-white hover:text-black p-3 mb-4  mr-8 sm:mb-0 sm:mr-8"
            >
              Sign in
            </Link>
            <Link
              to="/Registration"
              className=" hidden md:block border rounded-full bg-slate-200 p-3 sm:mb-0 sm:mr-8"
            >
              Sign up
            </Link>
          </div>
        </>
      )}

      {userNav && (
        <div
          ref={userNavRef}
          className="absolute z-50 top-20 right-0 bg-[#E5E7EB] border rounded shadow-lg w-48"
        >
          <Link
            to="/profile"
            className="block p-2 text-center text-black hover:bg-gray-200"
          >
            Profile
          </Link>
          <Link
            to="/Dashboard"
            className="block p-2 text-center text-black hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <button
            className="block p-2 text-black w-full hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      <Toaster />
    </div>
    <hr className="border-t border-gray-300 my-2 w-full" />
    </>
  );
};

export default Navbar;
