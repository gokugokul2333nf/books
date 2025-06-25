import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, username } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      navigate("/main");
    } catch (err) {
      console.error("Login error:", err);
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Please enter your details.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/">Sign up</a>
        </p>
      </div>
    </div>
  );
}
