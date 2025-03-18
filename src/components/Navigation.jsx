import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">EduGrade-AI</div>
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li><a href="#goals">Our Goals</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li>
            {user ? (
              <>
                <span className="user-name">{user.email}</span>
                <button className="auth-button" onClick={() => signOut(auth)}>Logout</button>
              </>
            ) : (
              <button className="auth-button" onClick={() => navigate("/auth")}>Sign-in/Sign-up</button>
            )}
          </li>
        </ul>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Navigation;