import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Header from "./pages/Header"; // Make sure this path is correct

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    checkAuth();
  }, [location]);

  const showHeader = isAuthenticated && location.pathname !== "/" && location.pathname !== "/login";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/main" /> : <Signup />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/main" /> : <Login />} />
        <Route path="/main" element={isAuthenticated ? <Main /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
