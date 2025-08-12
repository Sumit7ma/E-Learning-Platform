import React from "react";
import Sidebar from "../../components/student/Sidebar";

export default function PaymentFail() {
  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content text-white">
        <h2> Payment Failed</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}
