import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function CustomerQuote() {
  const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");


  const id = localStorage.getItem("id");
  const {slug} = useParams();
  console.log("id",id);
  console.log("slug",slug);
   const [quote, setQuote] = useState([]);
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
      const response = await axios.get(`${baseUrl}/api/customer/quote/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setQuote(response.data.data);
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
    {/* Top Navbar */}
   <Navbar />

    {/* Layout Container */}
    <div id="layoutSidenav" className="d-flex">

      {/* Sidebar (Black, below navbar) */}
      <div className="bg-black text-white p-3" style={{ minWidth: '200px', minHeight: '100vh' }}>

        <ul className="nav flex-column">
          <li className="nav-item">
          <Link className="nav-link text-white" to={`/customer/quote/${id}`}>Quotes</Link>
          </li>
        </ul>
      </div>

      {/* Page Content */}
      <div id="layoutSidenav_content" className="flex-grow-1 px-4 py-4">
      <main>
  <div className="container-fluid px-4">
    <div className="row py-6">
      <table style={{ width: "100%" }} className="table table-bordered">
        <thead>
          <tr>
            <th>Quote Id</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2" className="text-center">Loading...</td>
            </tr>
          ) : (
            quote.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <Link to={`/customer/quote/view/${item.id}`} style={{ textDecoration: "none" }}>
                    View
                  </Link>
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
