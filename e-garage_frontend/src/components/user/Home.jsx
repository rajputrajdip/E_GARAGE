

// import React, { useState } from "react";
// import { FaCar, FaTools, FaOilCan, FaSearchLocation } from "react-icons/fa";
// import { API } from "../../api";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [search, setSearch] = useState("");
//   const [garages, setGarages] = useState([]);
//   const navigate = useNavigate();

//   // 🔥 Search Garage
//   const handleSearch = async () => {
//     try {
//       const res = await API.get("/garageOwner/getallgarageowner");

//        console.log("res...",res.data);

//       const filtered = res.data.data.filter((g) =>
//         g.name.toLowerCase().includes(search.toLowerCase())
//       );

//       setGarages(filtered);
//     } catch (err) {
//       console.log(err);
//     }
   
    
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       {/* Hero Section */}
//       <section className="bg-slate-800 text-white py-24 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6">
//           Find Trusted Garages Near You
//         </h1>

//         <p className="text-lg mb-8">
//           Book vehicle services online quickly and easily with E-Garage.
//         </p>

//         <div className="flex justify-center gap-3">
//           <input
//             type="text"
//             placeholder="Search garage in your city..."
//             className="px-4 py-2 rounded text-black w-72"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <button
//             onClick={handleSearch}
//             className="bg-orange-500 px-6 py-2 rounded hover:bg-orange-600"
//           >
//             Search
//           </button>
//         </div>
//       </section>

//       {/* 🔥 Search Results (Garages) */}
//       {garages.length > 0 && (
//         <section className="py-10 px-10">
//           <h2 className="text-2xl font-bold mb-6 text-center">
//             Available Garages
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {garages.map((g) => (
//               <div
//                 key={g._id}
//                 className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer"
//                 onClick={() => navigate(`/services/${g._id}`)}
//               >
//                 <h3 className="text-xl font-semibold">{g.name}</h3>
//                 <p className="text-gray-600">{g.address}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Services */}
//       <section className="py-16 px-10 text-center">
//         <h2 className="text-3xl font-bold mb-12">Our Services</h2>

//         <div className="grid md:grid-cols-3 gap-10">

//           <div className="bg-white p-8 rounded shadow hover:shadow-lg">
//             <FaTools className="text-4xl text-orange-500 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">General Repair</h3>
//             <p>Professional repair services for all vehicles.</p>
//           </div>

//           <div className="bg-white p-8 rounded shadow hover:shadow-lg">
//             <FaOilCan className="text-4xl text-orange-500 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Oil Change</h3>
//             <p>Quick oil change and maintenance service.</p>
//           </div>

//           <div className="bg-white p-8 rounded shadow hover:shadow-lg">
//             <FaCar className="text-4xl text-orange-500 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold mb-2">Vehicle Inspection</h3>
//             <p>Complete vehicle check by professional mechanics.</p>
//           </div>

//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="bg-gray-200 py-16 text-center">
//         <h2 className="text-3xl font-bold mb-12">How It Works</h2>

//         <div className="grid md:grid-cols-4 gap-8 px-10">

//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">1️⃣ Register</h3>
//             <p>Create your account.</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">2️⃣ Search</h3>
//             <p>Find garages near you.</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">3️⃣ Book</h3>
//             <p>Select service and book appointment.</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-semibold mb-2">4️⃣ Service</h3>
//             <p>Your vehicle gets serviced.</p>
//           </div>

//         </div>
//       </section>

//       {/* Feature Section */}
//       <section className="py-16 text-center px-10">
//         <h2 className="text-3xl font-bold mb-12">Why Choose E-Garage?</h2>

//         <div className="grid md:grid-cols-3 gap-10">

//           <div className="bg-white p-6 rounded shadow">
//             <FaSearchLocation className="text-3xl text-orange-500 mx-auto mb-4"/>
//             <h3 className="text-xl font-semibold">Nearby Garages</h3>
//             <p>Find trusted garages in your area.</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-semibold">Easy Booking</h3>
//             <p>Book services in just a few clicks.</p>
//           </div>

//           <div className="bg-white p-6 rounded shadow">
//             <h3 className="text-xl font-semibold">Trusted Mechanics</h3>
//             <p>Experienced and verified mechanics.</p>
//           </div>

//         </div>
//       </section>

//       {/* CTA */}
//       <section className="bg-orange-500 text-white py-16 text-center">
//         <h2 className="text-3xl font-bold mb-4">
//           Ready to Service Your Vehicle?
//         </h2>

//         <p className="mb-6">
//           Find the best garages and book your service today.
//         </p>

//         <button className="bg-white text-orange-500 px-8 py-3 rounded font-semibold hover:bg-gray-100">
//           Get Started
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white text-center py-6">
//         <p>© 2026 E-Garage. All Rights Reserved.</p>
//       </footer>

//     </div>
//   );
// }

// export default Home;



import React, { useState } from "react";
import { FaCar, FaTools, FaOilCan, FaSearchLocation } from "react-icons/fa";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState("");
  const [garages, setGarages] = useState([]);
  const navigate = useNavigate();

  // 🔥 Search Garage
  const handleSearch = () => {
  if (!search.trim()) {
    alert("Please enter garage name");
    return;
  }

  navigate(`/garages?search=${search}`);
};

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
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

      {/* 🔥 Garage Results (Premium UI) */}
      {garages.length > 0 && (
        <section className="py-10 px-10">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Available Garages
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
           {garages.map((g) => {
  console.log("IMAGE:", g.image); // ✅ DEBUG LINE

  return (
    <div
      key={g._id}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
      onClick={() => navigate(`/services/${g._id}`)}
    >
      {/* Image */}
      <img
        src={
          g.image && g.image !== ""
            ? g.image
            : "https://via.placeholder.com/300"
        }
        alt={g.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold">{g.name}</h3>
        <p className="text-gray-500">{g.address}</p>

        <p className="text-yellow-500 mt-2">
          ⭐ {g.rating || 4} / 5
        </p>
      </div>
    </div>
  );
})}
          </div>
        </section>
      )}

      {/* Services */}
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

      {/* How It Works */}
      <section className="bg-gray-200 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-8 px-10">

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">1️⃣ Register</h3>
            <p>Create your account.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">2️⃣ Search</h3>
            <p>Find garages near you.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">3️⃣ Book</h3>
            <p>Select service and book appointment.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">4️⃣ Service</h3>
            <p>Your vehicle gets serviced.</p>
          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 text-center px-10">
        <h2 className="text-3xl font-bold mb-12">Why Choose E-Garage?</h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white p-6 rounded shadow">
            <FaSearchLocation className="text-3xl text-orange-500 mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Nearby Garages</h3>
            <p>Find trusted garages in your area.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold">Easy Booking</h3>
            <p>Book services in just a few clicks.</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold">Trusted Mechanics</h3>
            <p>Experienced and verified mechanics.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Service Your Vehicle?
        </h2>

        <p className="mb-6">
          Find the best garages and book your service today.
        </p>

        <button className="bg-white text-orange-500 px-8 py-3 rounded font-semibold hover:bg-gray-100">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white text-center py-6">
        <p>© 2026 E-Garage. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;