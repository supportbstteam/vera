import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404</h1>
      <p>Oops, nothing to see here.</p>
      <button className="btn btn-primary my-4" onClick={() => navigate(-1)} > Go Back </button>
    </div>
  );
}
