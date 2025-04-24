import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Swal from "sweetalert2";
export default function SendQuote() {
    const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [productDetails, setProductDetails] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const quoteSent = async () => {
    const stored = localStorage.getItem("quote_products");
    const selectedProducts = stored ? JSON.parse(stored) : [];
    if (selectedProducts.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No products found",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    const product_id = selectedProducts.map((item) => item.product_id);
    const queryString = product_id.map((id) => `product_id[]=${id}`).join("&");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Please login first",
          timer: 2000,
          showConfirmButton: false,
        });
        return;
      }

      Swal.fire({
        title: "Sending...",
        text: "Please wait while we send your mail.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await axios.get(`${baseUrl}/api/sent-quote?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.close();
      if (response.data.status) {
        const msg = response.data.message;
        setMessage(msg);
        // Swal.fire({
        //   icon: "success",
        //   title: msg,
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
        localStorage.removeItem("quote_products");
      } else {
        const msg = response.data.message;
        setMessage(msg);
        // Swal.fire({
        //   icon: "error",
        //   title: "There are no suppliers.",
        //   timer: 2000,
        //   showConfirmButton: false,
        // });
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
    quoteSent();
  }, []);
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand */}
        <Link className="navbar-brand ps-3" to="/category">
          <h2>VERA</h2>
        </Link>
        {/* Sidebar Toggle */}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
        >
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
        <main className="container py-4">

{/* <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
  <i className="fa fa-arrow-left me-2"></i> Back
</button> */}

{message && (
  <div className="alert alert-success fade show position-relative" role="alert">
    <h4 className="alert-heading">Thank you!</h4>
    <p>You will be contacted shortly by our suppliers.</p>
    <hr />
    <p className="mb-0"><strong>Success:</strong> {message}</p>

    <button
      type="button"
      className="btn-close position-absolute top-0 end-0 m-3"
      onClick={() => navigate(-1)}
      aria-label="Close"
    ></button>
  </div>
)}

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
