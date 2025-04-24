import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Checkout() {
    const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [checkout, setCheckout] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const quoteSent = async (quoteSent) => {
    const product_id = quoteSent.map((item) => item.product_id);
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
        setMessage(response.data.message);
        const msg = response.data.message;
        console.log(message);
        setLoading(false);
        setCheckout([]);
        Swal.fire({
          icon: "success",
          title: msg,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.log("no");
        Swal.fire({
          icon: "error",
          title: "There are no supplier.",
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
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axios.get(`${baseUrl}/api/checkout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCheckout(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      if (error.response?.status === 401) {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand ps-3" to="/category">
          <h1>VERA</h1>
        </Link>
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
        <div id="layoutSidenav_content" className=" px-4 py-4">
          <main>
            <div className="flex justify-end" style={{ float: "right" }}>
              <button href="/category" className="btn btn-primary" onClick={() => navigate(-1)}>Add more to quotes</button>
            </div>
            <h2 className="text-center">Checkout</h2>
            <ul className="list-group mb-3">
              {/* Header */}
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div style={{ flex: 1, textAlign: "left" }}>
                  <h4 className="my-0">Name</h4>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <h4 className="my-0">Image</h4>
                </div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <h4 className="my-0">Price</h4>
                </div>
              </li>
              {/* Product List */}
              {Array.isArray(checkout) && checkout.length > 0 ? (
                checkout.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <h6 className="text-muted">{item.product.name}</h6>
                    </div>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <img src={`${baseUrl}/public/${item.product.image}`} alt={item.product.name} style={{ width: 60, height: 60, objectFit: "cover" }}/>
                    </div>
                    <div style={{ flex: 1, textAlign: "right" }}>
                      <span className="text-muted">
                        ${item.product.price || 0}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">No products in quote</li>
              )}
              {/* Total */}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>
                  $
                  {checkout
                    .reduce((sum, item) => sum + (item.product.price || 0), 0)
                    .toFixed(2)}
                </strong>
              </li>
            </ul>
            <div className="flex justify-end" style={{ float: "right" }}>
              {/* <button className="btn btn-primary" onClick={() => quoteSent()}>Send Quote</button> */}
              {/* <Link className="btn btn-primary"  disabled={checkout.length === 0} to = "/SendQuote/checkout">
                Send Quote
              </Link> */}
              <Link
  className="btn btn-primary"
  disabled={checkout.length === 0}
  to="/sendquote"
  onClick={() => localStorage.setItem("quote_products", JSON.stringify(checkout))}
>
  Send Quote
</Link>
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
