import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
export default function ProductDetails() {
    const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { slug } = useParams();
  const handleAddToQuote = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Please login first",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      const response = await axios.post(
        `${baseUrl}/api/product/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Product added to quote!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/checkout");
      } else if (response.data.message === "Product is already added") {
        Swal.fire({
          icon: "info",
          title: "Product is already in quote.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add product to quote.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Add to quote error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const response = await axios.get(
          `${baseUrl}/api/product/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setProductDetails(response.data.data); // assuming `data` is an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, navigate]);
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
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/checkout">{" "}{email}</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/checkout">Checkout</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Logout">Logout</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        {/* <div id="layoutSidenav_nav">
        </div> */}
        <div id="layoutSidenav_content" className=" px-4 py-4">
          <main>
            <button className="btn btn-primary my-4" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Back
            </button>
            <div className="container-fluid px-4">
              <div className="container-fluid px-4"></div>
            </div>
            <div className="row py-6">
              <div className="col-xl-6 col-md-6">
                <div className="img d-flex justify-content-center">
                  <img src={`${baseUrl}/public/${productDetails.image}`} alt="Product"/>

                </div>

                <div className="d-flex justify-content-center my-3">
                  <button className="btn  btn-primary" onClick={() => handleAddToQuote(productDetails.id)}>
                    Add to Quote
                  </button>
                </div>
              </div>
              <div className="col-xl-6 col-md-6">
                <h2>{productDetails.name}</h2>
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
