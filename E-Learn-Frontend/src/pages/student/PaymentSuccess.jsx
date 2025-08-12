import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";

export default function PaymentSuccess() {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing"); // processing | success | failed

  useEffect(() => {
    let mounted = true; 

    api.post(`/student/payment/success/${id}`)
      .then(() => {
        if (!mounted) return;
        setStatus("success");
        setTimeout(() => navigate("/student/enrollments"), 1000);
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("failed");
      });

    return () => { mounted = false; };
  }, [id, navigate]);

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content text-white">
        {status === "processing" && (
          <>
            <h2>⏳ Processing Payment...</h2>
            <p>Enrolling you in the course...</p>
          </>
        )}
        {status === "success" && (
          <>
            <h2 className="text-success">Payment Successful</h2>
            <p>Redirecting to your Enrollments...</p>
          </>
        )}
        {status === "failed" && (
          <>
            <h2 className="text-danger"> Payment Failed</h2>
            <p>Please try again later.</p>
          </>
        )}
      </div>
    </div>
  );
}
