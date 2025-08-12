import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";

export default function PaymentSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const timer = setTimeout(() => {
      
      api.post(`/student/payment/success/${id}`)
        .then(() => {
          setStatus("success");

          setTimeout(() => {
            alert("✅ Payment successful! You are now enrolled in the course.");
            navigate("/student/enrollments");
          }, 1000);
        })
        .catch(() => {
          setStatus("failed");
        });
    }, 4000); 

    return () => clearTimeout(timer);
  }, [id, navigate]);

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content text-white">
        {status === "processing" && (
          <>
            <h2>Processing Payment...</h2>
            <p>Please wait while we confirm your payment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-success"> Payment Successful</h2>
            <p>Enrolling you in the course...</p>
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
