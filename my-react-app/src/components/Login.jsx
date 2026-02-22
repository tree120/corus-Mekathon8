import React, { useState } from "react";
import "./Login.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // Add API call here

    navigate("/dashboard");
  };

  return (

    <div className="login-container">

      <motion.div
        className="login-box"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <h2>LOGIN</h2>

        <input
          type="email"
          placeholder="EMAIL"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogin}
        >
          LOGIN
        </motion.button>

      </motion.div>

    </div>
  );
}