// src/components/student/BuyCard.jsx
import React from "react";
import "../../style/BuyCard.css";


export default function BuyCard({ price, onBuy }) {
  return (
    <div className="buy-card">
      <h4 className="text-light mb-3">Buy this course</h4>
      <p className="text-success fs-5 fw-bold">₹{price}</p>
      <button onClick={onBuy} className="btn btn-warning w-100">
        Buy Now
      </button>
    </div>
  );
}

