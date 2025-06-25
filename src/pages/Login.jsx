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
      const message = err.response?.data?.message || "Login failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Welcome Back</h2>
          <p className="subtext">Log in to continue using Bookmark Saver</p>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="submit-btn">Sign In</button>
            <p className="signup-link">
              Don’t have an account? <a href="/">Sign up</a>
            </p>
          </form>
        </div>
        <div className="login-right">
          <img src="https://i.pinimg.com/736x/32/03/c1/3203c18a8ce3957cae819d57830bdb03.jpg" alt="Bookmark" />
          <h3>Bookmark Saver</h3>
          <p>
            Your smart bookmarking system to organize and access your favorite sites anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
