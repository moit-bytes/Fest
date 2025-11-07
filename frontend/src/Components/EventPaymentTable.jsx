import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useRecoilState } from "recoil";
import { paymentsState } from "../Atom/Payment"; // you can create a separate atom if needed

const EventPaymentTable = () => {
  const [payments, setPayments] = useRecoilState(paymentsState);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/user/allevents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(data);
    } catch (err) {
      console.error("Error fetching event payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // extract unique filter options dynamically
  const uniqueCategories = ["all", ...new Set(payments.map(p => p.categoryName).filter(Boolean))];
  const uniqueSubCategories = ["all", ...new Set(payments.map(p => p.subCategory).filter(Boolean))];
  const uniqueStatuses = ["all", ...new Set(payments.map(p => p.status).filter(Boolean))];

  // apply filters
  const filteredPayments = payments.filter((p) => {
    const statusMatch = statusFilter === "all" || p.status === statusFilter;
    const categoryMatch = categoryFilter === "all" || p.categoryName === categoryFilter;
    const subCategoryMatch = subCategoryFilter === "all" || p.subCategory === subCategoryFilter;
    return statusMatch && categoryMatch && subCategoryMatch;
  });

  const columns = [
    { name: "Leader Name", selector: row => row.leaderName || "-", sortable: true },
    { name: "Team Name", selector: row => row.teamName || "-", sortable: true },
    { name: "Email", selector: row => row.email, sortable: true },
    { name: "Institution", selector: row => row.institutionName || "-", sortable: true },
    { name: "Category", selector: row => row.categoryName || "-", sortable: true },
    { name: "Sub-Category", selector: row => row.subCategory || "-", sortable: true },
    { name: "Amount", selector: row => `₹${row.amount}`, sortable: true },
    { name: "Unique ID", selector: row => row.uniqueId, sortable: true },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`px-2 py-1 rounded-full text-white font-semibold ${
            row.status === "issued"
              ? "bg-green-500"
              : row.status === "initiated"
              ? "bg-yellow-500"
              : row.status === "expired"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Event Payments</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Category Filter */}
        <div>
          <label className="text-white font-medium mr-2">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
          >
            {uniqueCategories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* SubCategory Filter */}
        <div>
          <label className="text-white font-medium mr-2">Sub-Category:</label>
          <select
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
          >
            {uniqueSubCategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-white font-medium mr-2">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
          >
            {uniqueStatuses.map((status, i) => (
              <option key={i} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredPayments}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default EventPaymentTable;
