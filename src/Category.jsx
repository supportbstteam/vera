import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import BaseComponent from "bootstrap/js/dist/base-component";
import Navbar from "./Navbar";
export default function Category() {
  const baseUrl = process.env.REACT_APP_API_URL
  const email = localStorage.getItem("email");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category data:", error);
      if (error.response?.status === 401) {
        navigate("");
      }
      setLoading(false);
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
