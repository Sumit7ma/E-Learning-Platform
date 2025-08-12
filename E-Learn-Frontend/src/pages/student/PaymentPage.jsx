import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/student/Sidebar";
import "../../style/PaymentPage.css";

export default function PaymentPage() {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(`/student/payment/success/${id}`);
  };

  const handleCancel = () => {
    navigate(`/student/payment/fail/${id}`);
  };

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content text-white">
        <h2>Complete Your Payment</h2>
        <p>You're about to purchase this course. Click below to proceed.</p>

        <div className="payment-buttons mt-4">
          <button className="btn btn-success me-3" onClick={handlePayment}>
            Pay Now
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel Payment
          </button>
        </div>
      </div>
    </div>
  );
}
