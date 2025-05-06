import React, { useState,useEffect,useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

export default function SendQuote() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const email = localStorage.getItem("email");
  const [productDetails, setProductDetails] = useState([]);
  const [message, setMessage] = useState("");
  const [statusCode, setStatusCode] = useState(true);
  const hasSent = useRef(false);
  const navigate = useNavigate();
  const { slug } = useParams();
  const quoteSent = async () => {
    if (hasSent.current) return;
    hasSent.current = true;
    const stored = localStorage.getItem("quote_products");
    const selectedProducts = stored ? JSON.parse(stored) : [];
    const token = localStorage.getItem("token");
    if (selectedProducts.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No products found",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/checkout');
      return;
    }
    const product_id = selectedProducts.map((item) => item.product_id);
    const queryString = product_id.map((id) => `product_id[]=${id}`).join("&");
    try {
      Swal.fire({
        title: "Sending...",
        text: "Please wait while we send your mail.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await axios.get(`${baseUrl}/api/sent-quote?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.close();
      if (response.data.status_code === "no_supplier") {
        setStatusCode(false);
      }
      if (response.data.status) {
        let msg = response.data.message;
        if (response.data.not_message) {
          msg += " " + response.data.not_message;
        }
        setMessage(msg);
        localStorage.removeItem("quote_products");
      } else {
        const msg = response.data.message || "Something went wrong.";
        setMessage(msg);
      }
    } catch (error) {
      console.error("Add to quote error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
      navigate('/checkout');
    }
  };
  useEffect(() => {
    quoteSent();
  }, []);
  return (
    <>
   <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content" className=" px-4 py-4">
        <main className="container py-4">
{message && (
  <div className="alert alert-success fade show position-relative" role="alert">
    <h4 className="alert-heading">Thank you!</h4>
    {statusCode ? (
        <p>You will be contacted shortly by our suppliers.</p>
      ) : (
        <p>Unfortunately, no suppliers were found for some categories.</p>
      )}

    <hr />
    <p className="mb-0"><strong>Success:</strong> {message}</p>
    <button type="button" className="btn-close position-absolute top-0 end-0 m-3" onClick={() => navigate(-1)} aria-label="Close" ></button>
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
