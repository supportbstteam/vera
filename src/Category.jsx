import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function Category() {
    const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  console.log("mughis");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const response = await axios.get(`${baseUrl}/api/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        setCategory(response.data.data);
        setLoading(false); // move this here
      } catch (error) {
        console.error("Error fetching category data:", error);
        if (error.response?.status === 401) {
          navigate("");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand */}
        <Link className="navbar-brand ps-3" to="/category">
          <h2>VERA</h2>
        </Link>

        {/* Sidebar Toggle */}
        <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
          <i className="fas fa-bars"></i>
        </button>

        {/* Navbar Search */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group"></div>
        </form>

        {/* Navbar */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" >
              <li><Link className="dropdown-item" to="/checkout">{" "}{email}</Link></li>
              <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>
              <li><Link className="dropdown-item" to="/Logout">Logout</Link></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div id="layoutSidenav">
        {/* <div id="layoutSidenav_nav">
        </div> */}

        <div id="layoutSidenav_content" className=" px-4 py-4">
          <main>
            <div className="container-fluid px-4">
              <div className="container-fluid px-4"></div>
            </div>
            <div className="row py-6 ">
              {loading ? (
                <div className="text-center">Loading...</div>
              ) : (
                category.map((item) => (
                  <div className="col-xl-3 col-md-3 my-3 mx-5 hover-effect py-3 px-3" key={item.id}>
                    <Link to={`/category/${item.slug}`} className="text-decoration-none" >
                       <img src={`${baseUrl}/public/${item.image}`} alt="Product" style={{ width: 300, height: 200 }} />

                      <h4 className="text-center py-3" style={{ color: "black" }} >{item.name}</h4>
                    </Link>
                  </div>
                ))
              )}
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
