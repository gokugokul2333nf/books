import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import "./Signup.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", {
        username,
        email,
        password,
      });
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <h2>Create Your Account</h2>
          <p className="subtext">Join Bookmark Saver and start saving smarter</p>
          <form onSubmit={handleSignup} className="signup-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
                <input type="checkbox" /> Keep me logged in
              </label>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="submit-btn">Sign Up</button>
            <p className="login-link">
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
        <div className="signup-right">
          <img src="https://i.pinimg.com/736x/15/47/c1/1547c11ae29089c573614ed932e8cf4a.jpg" alt="Bookmark" />
          <h3>Bookmark Saver</h3>
          <p>
            Save your favorite websites, organize them, and access them anytime from anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
