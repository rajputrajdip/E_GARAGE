import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GetApiDemo = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://node5.onrender.com/user/user/");
      setUsers(res.data?.data || []);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch users ");
    } finally {
      setLoading(false);
    }

  }
  const deleteUsers = async(id)=>{
      const res = await axios.delete(`https://node5.onrender.com/user/user/${id}`)
      console.log(res)
      if(res.status==204){
        toast.success("data successfully deleted")
        getUsers();
      }
    }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6" >
      <h1 className="text-3xl font-bold text-center mb-6">
        GET API Demo (Tailwind Table)
      </h1>

      {loading && (
        <p className="text-center text-blue-500 font-semibold">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 font-semibold">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Age</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4 text-sm">
                      {user._id.slice(-6)}
                    </td>
                    <td className="py-2 px-4">
                      {user.name || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {user.email || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {user.age || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {user.isActive ? (
                        <span className="text-green-600 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-600 font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td>
                      <button onClick={()=>{deleteUsers(user._id)}} className='text-red-500 cursor-pointer font-bold'>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500"
                  >
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetApiDemo;