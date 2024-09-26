import React from 'react';
import './Dashboard.css'; // CSS file import

const Dashboard = () => {
  console.log("Dashboard Rendered");
  return (
    <div className="dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      {/* Here you can add charts, stats, or any other widgets */}
      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Total Products</h3>
          <p>150</p>
        </div>
        <div className="widget">
          <h3>Total Orders</h3>
          <p>350</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
