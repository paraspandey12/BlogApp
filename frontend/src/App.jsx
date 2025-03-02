import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

import Navbar from "./components/Navbar";
import Editor from "./pages/Editor";
import Dashboard from "./components/Dashboard";
import AuthProvider from "./context/AuthContext";
import Home from "./pages/Home"
import Profile from "./pages/Profile";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Router>
        
          <Routes>

            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Registration" element={<Registration/>} />
            <Route path="/Editor" element={<Editor/>} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
