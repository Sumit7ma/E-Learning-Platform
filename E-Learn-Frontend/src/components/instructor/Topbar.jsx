import React from "react";
import "../../style/Topbar.css";

export default function Topbar({ title = "Dashboard" }) {
  return (
    <div className="topbar">
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
