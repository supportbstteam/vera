import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function SupplierDashboard() {
    const id = localStorage.getItem('id');
  const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.response?.status === 401) {
        navigate("");
      }
    }
  };
  useEffect(() => {
  }, []);
  return (
    <>
<div id="layoutSidenav">
  <div id="layoutSidenav_nav">
    <nav className="sb-sidenav accordion sb-sidenav-dark" style={{ backgroundColor: '#000' }}>
      <div className="sb-sidenav-menu">
        <div className="nav">
        <Link className="navbar-brand ps-3" to="/supplier/dashboard">
              <h2>VERA</h2>
            </Link>
          {/* <Link className="nav-link text-white" to="supplier/quote">
            <div className="sb-nav-link-icon"><i className="fas fa-file-alt"></i></div>
            Quotes
          </Link> */}
          <Link className="nav-link text-white" to={`/supplier/quote/${id}`}>
  <div className="sb-nav-link-icon"><i className="fas fa-file-alt"></i></div>
  Quotes from Admin
</Link>
<Link className="nav-link text-white" to={`/supplier/quote/sent/${id}`}>
  <div className="sb-nav-link-icon"><i className="fas fa-file-alt"></i></div>
  Quotes sent to Admin
</Link>
        </div>
      </div>
    </nav>
  </div>
  <div id="layoutSidenav_content" className="">
    <main>
      <div className="container-fluid px-4">
        <div className="row py-6">
          <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
              <i className="fas fa-bars"></i>
            </button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
              <div className="input-group"></div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-user fa-fw"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/checkout">{email}</Link></li>
                  <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>
                  <li><Link className="dropdown-item" to="/Logout">Logout</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
    <footer className="py-4 bg-light mt-auto">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-muted">&copy; Vera 2025</div>
        </div>
      </div>
    </footer>
  </div>
</div>
    </>
  );
}
