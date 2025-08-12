import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";

export default function PaymentFail() {
  const { id } = useParams(); 

  useEffect(() => {
   
    api.post(`/student/payment/cancel/${id}`).catch(() => {});
  }, [id]);

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content text-white">
        <h2>Payment Cancelled</h2>
        <p>Your payment was cancelled. You can try again anytime.</p>
      </div>
    </div>
  );
}
