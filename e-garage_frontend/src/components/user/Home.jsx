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
    <div className="bg-gray-50 min-h-screen">

      {/* 🔥 HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-28 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Trusted Garages <br />
          <span className="text-orange-400">Near You 🚗</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 text-gray-300">
          Book vehicle services quickly & easily with E-Garage.
        </p>

        {/* 🔥 SEARCH BAR */}
        <div className="flex justify-center">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-xl">
            
            <div className="px-4 text-gray-500">
              <FaSearchLocation />
            </div>

            <input
              type="text"
              placeholder="Search garage in your city..."
              className="flex-1 px-3 py-3 outline-none text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 🔥 SERVICES */}
      <section className="py-20 px-6 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-gray-800">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaTools className="text-5xl text-orange-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">General Repair</h3>
            <p className="text-gray-600">
              Professional repair services for all types of vehicles.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaOilCan className="text-5xl text-orange-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Oil Change</h3>
            <p className="text-gray-600">
              Fast and reliable oil change with premium quality service.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <FaCar className="text-5xl text-orange-500 mx-auto mb-5" />
            <h3 className="text-xl font-semibold mb-2">Vehicle Inspection</h3>
            <p className="text-gray-600">
              Complete inspection by certified professional mechanics.
            </p>
          </div>

        </div>
      </section>

      {/* 🔥 CTA SECTION */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Book Your Service?
        </h2>
        <p className="mb-6 text-lg">
          Find the best garages near you and book instantly.
        </p>
        <button
          onClick={() => navigate("/garages")}
          className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Explore Garages
        </button>
      </section>

      {/* 🔥 FOOTER */}
      <footer className="bg-slate-900 text-gray-300 text-center py-6">
        <p className="text-sm">
          © 2026 <span className="text-orange-400 font-semibold">E-Garage</span>. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;




