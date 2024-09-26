import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Sidebar.css'; 

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    
    navigate("/login")
  }
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="https://t4.ftcdn.net/jpg/02/86/20/27/360_F_286202792_yLD4HEmCF2YpIgevD2sNnOQ8PambyfZn.jpg" alt="Logo" />
      </div>
      <ul className="menu">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/Add-Product">Add-Product</Link></li>
        <li><Link to="/admin/products">Products-List</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><button className="logout-button" onClick={handleLogout}>Log-Out</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
