import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function CustomerQuote() {
  const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const {slug} = useParams();
  const id = localStorage.getItem("id");
  const [quote, setQuote] = useState([]);
  const [quotePrice, setQuotePrice] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (!token) {
        navigate("/");
        return;
      }
      const response = await axios.get(`${baseUrl}/api/customer/quote/view/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setQuote(response.data.data);
      setQuotePrice(response.data.groupedDataPrice);
      console.log("price",response.data.groupedDataPrice);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.response?.status === 401) {
        navigate("");
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
   <Navbar />
    <div id="layoutSidenav" className="d-flex">
      <div className="bg-black text-white p-3" style={{ minWidth: '200px', minHeight: '100vh' }}>
        <ul className="nav flex-column">
          <li className="nav-item">
          <Link className="nav-link text-white" to={`/customer/quote/${id}`}>Quotes</Link>
          </li>
        </ul>
      </div>
      <div id="layoutSidenav_content" className="flex-grow-1 px-4 py-4">
      <main>
    <div className="container-fluid px-4">
    <h2 className="text-center text-primary">Product sent to admin for prices</h2>
    <div className="row py-6">
      {/* Product Table */}
       <table style={{ width: "100%" }} className="table table-bordered mb-4">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Category</th>
                   <th>Image</th>
                </tr>
            </thead>
            <tbody>
          {loading ? (
                <tr>
                    <td colSpan="3" className="text-center">Loading...</td>
                </tr>
          ) : (
            quote.map((item, index) => (
                <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.category_name}</td>
                    <td>
                        <img
                    src={`${baseUrl}/public/${item.product_image}`}
                    alt="Product"
                    style={{ width: 300, height: 200, objectFit: 'cover' }}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h2 className="text-center text-primary">Price sent from admin</h2>
      <table style={{ width: "100%" }} className="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>Prices</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">Loading...</td>
            </tr>
          ) : (
            quotePrice.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>
                <td>{item.category_name}</td>
                <td>
                  <img src={`${baseUrl}/public/${item.product_image}`} alt="Product" style={{ width: 150, height: 100, objectFit: 'cover' }}/>
                </td>
                <td>
                  {item.prices.map((price, idx) => (
                    <div key={idx}>{price}</div>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
