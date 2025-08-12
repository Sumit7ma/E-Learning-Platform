// src/pages/student/PaymentHistory.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";

export default function PaymentHistory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/student/payment/history")
      .then(res => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content text-white">
        <h2>Payment History</h2>
        <div className="table-responsive mt-3">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Provider</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p, idx) => (
                <tr key={p.id}>
                  <td>{idx + 1}</td>
                  <td>{p.courseTitle}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.status === "SUCCESS" ? "✅ Success" : " Cancelled"}</td>
                  <td>{p.provider}</td>
                  <td>{new Date(p.timestamp).toLocaleString()}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No payments yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
