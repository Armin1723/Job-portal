import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const About = () => {
  const location = useLocation();
  const theme = useSelector((state) => state.theme.value);
  return (
    <div className={` ${theme === 'dark' && 'bg-zinc-900 text-white'} w-screen min-h-[100dvh] font-gupter`}>
      <Navbar>
        {location.pathname === "/auth/register" ? (
          <Link to="/auth/login" className="auth-button">Log In</Link>
        ) : (
          <Link to="/auth/register" className="auth-button">Sign Up</Link>
        )}
      </Navbar>
      <Outlet />
    </div>
  );
};

export default About;