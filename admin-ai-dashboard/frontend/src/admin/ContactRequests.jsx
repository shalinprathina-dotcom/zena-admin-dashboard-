import React, { useEffect, useMemo, useState } from "react";
import { deleteContactRequest, getContactRequests } from "./api";
import Swal from "sweetalert2";

function ContactRequests() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const result = await getContactRequests();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch contact requests");
      }

      setRows(result.data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((item) => {
      const name = (item.name || "").toLowerCase();
      const email = (item.email || "").toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query)
      );
    });
  }, [rows, search]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Contact Request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await deleteContactRequest(id);

      if (!response.success) {
        throw new Error(response.message);
      }

      setRows((prevRows) =>
        prevRows.filter((item) => item.id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Contact request deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message || "Failed to delete contact request.",
      });
    }
  };

  if (loading) {
    return (
      <div className="state-box">
        Loading contact requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-box error-state">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="panel-card">

        <div className="panel-header">
          <h2>Contact Requests</h2>

          <input
            type="text"
            className="search-input"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredRows.length === 0 ? (
          <div className="empty-state">
            No contact requests found.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Requirement</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRows.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name || "-"}</td>
                    <td>{item.email || "-"}</td>
                    <td>{item.phone || "-"}</td>
                    <td>{item.requirement || "-"}</td>

                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="danger-button"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default ContactRequests;