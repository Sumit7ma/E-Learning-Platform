import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="p-4 text-white bg-dark min-vh-100">
      <h2>👮 Admin Panel</h2>
      <p>All Registered Users:</p>
      <table className="table table-dark table-striped">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
