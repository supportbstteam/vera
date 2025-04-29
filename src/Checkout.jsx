import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

export default function Checkout() {
    const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [checkout, setCheckout] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
 <Navbar />
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
              <Link className="btn btn-primary" disabled={checkout.length === 0} to="/sendquote" onClick={() => localStorage.setItem("quote_products", JSON.stringify(checkout))}>Send Quote</Link>
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
