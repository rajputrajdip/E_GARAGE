import React, { useEffect, useState } from "react";
import { API } from "../../api";

export const AllPaymentList = () => {
  const [payments, setPayments] = useState([]);

  // Fetch payments from backend
  const getPayments = async () => {
    try {
      const res = await API.get("/payments"); // Backend route
      setPayments(res.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">All Payments</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">User</th>
                <th className="py-2 px-4 border">Booking</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id} className="text-center hover:bg-gray-100">
                  <td className="py-2 px-4 border">{payment.userName}</td>
                  <td className="py-2 px-4 border">{payment.bookingName}</td>
                  <td className="py-2 px-4 border">₹ {payment.amount}</td>
                  <td className="py-2 px-4 border">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};