import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => navigate("/login"), 500);
  };

  const fetchProducts = async () => {
    try {
      const url = import.meta.env.VITE_API_URL + "/products";
      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
     
      setProducts(result);
    } catch (err) {
      handleError(err.message || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Welcome, {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <div>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>{item.name}</li>
              <li>{item.description}</li>
              <li>Price: ${item.price}</li>
            </ul>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
