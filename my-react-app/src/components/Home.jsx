import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// replace with your image path
import mobileImage from "../assets/o.png";
import logo from "../assets/Tatva.jpg";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Navbar */}
      <motion.div
        className="navbar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={logo} alt="logo" className="logo" />

        <motion.button
          className="start-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          GET STARTED
        </motion.button>

      </motion.div>


      {/* Hero Section */}
      <div className="hero">

        {/* Left Text */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h1>
            WHERE EVERY SCAN <br />
            REVEALS THE TRUTH
          </h1>

          <motion.button
            className="start-btn large"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 30px #00f7ff"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            START SCANNING →
          </motion.button>

        </motion.div>


        {/* Right Image */}
        <motion.div
          className="image-card"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{ duration: 1.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={mobileImage}
            alt="mobile"
            animate={{
              y: [0, -15, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
          />
        </motion.div>

      </div>

    </div>
  );
}
