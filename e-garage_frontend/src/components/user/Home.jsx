
// components/user/Home.jsx
import React, { useState } from "react";
import { FaCar, FaTools, FaOilCan, FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) {
      alert("Please enter garage name");
      return;
    }

    navigate(`/garages?search=${search}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ✅ HERO SECTION */}
      <section className="bg-slate-800 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Trusted Garages Near You
        </h1>

        <p className="text-lg mb-8">
          Book vehicle services online quickly and easily with E-Garage.
        </p>

        <div className="flex justify-center gap-3">
          <input
            type="text"
            placeholder="Search garage in your city..."
            className="px-4 py-2 rounded text-black w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-orange-500 px-6 py-2 rounded hover:bg-orange-600"
          >
            Search
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-10 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded shadow hover:shadow-lg">
            <FaTools className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">General Repair</h3>
            <p>Professional repair services for all vehicles.</p>
          </div>

          <div className="bg-white p-8 rounded shadow hover:shadow-lg">
            <FaOilCan className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Oil Change</h3>
            <p>Quick oil change and maintenance service.</p>
          </div>

          <div className="bg-white p-8 rounded shadow hover:shadow-lg">
            <FaCar className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Vehicle Inspection</h3>
            <p>Complete vehicle check by professional mechanics.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white text-center py-6">
        <p>© 2026 E-Garage. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;