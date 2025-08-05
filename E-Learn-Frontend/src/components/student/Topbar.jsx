import React from "react";
import "../../style/Topbar.css";

export default function Topbar({ title }) {
  return (
    <div className="topbar">
      <h2>{title}</h2>
      <input className="search-bar" type="text" placeholder="Search for courses" />
    </div>
  );
}
