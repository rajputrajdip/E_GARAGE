// import React, { useState } from "react";
// import { FaCar, FaTools, FaOilCan, FaSearchLocation } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!search.trim()) {
//       alert("Please enter garage name");
//       return;
//     }
//     navigate(`/garages?search=${search}`);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">

//       {/* 🔥 HERO SECTION */}
//       <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-28 text-center px-4">
//         <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
//           Find Trusted Garages <br />
//           <span className="text-orange-400">Near You 🚗</span>
//         </h1>

//         <p className="text-lg md:text-xl mb-10 text-gray-300">
//           Book vehicle services quickly & easily with E-Garage.
//         </p>

//         {/* 🔥 SEARCH BAR */}
//         <div className="flex justify-center">
//           <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-xl">
            
//             <div className="px-4 text-gray-500">
//               <FaSearchLocation />
//             </div>

//             <input
//               type="text"
//               placeholder="Search garage in your city..."
//               className="flex-1 px-3 py-3 outline-none text-black"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />

//             <button
//               onClick={handleSearch}
//               className="bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 🔥 SERVICES */}
//       <section className="py-20 px-6 md:px-16 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold mb-14 text-gray-800">
//           Our Services
//         </h2>

//         <div className="grid md:grid-cols-3 gap-10">

//           {/* CARD 1 */}
//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
//             <FaTools className="text-5xl text-orange-500 mx-auto mb-5" />
//             <h3 className="text-xl font-semibold mb-2">General Repair</h3>
//             <p className="text-gray-600">
//               Professional repair services for all types of vehicles.
//             </p>
//           </div>

//           {/* CARD 2 */}
//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
//             <FaOilCan className="text-5xl text-orange-500 mx-auto mb-5" />
//             <h3 className="text-xl font-semibold mb-2">Oil Change</h3>
//             <p className="text-gray-600">
//               Fast and reliable oil change with premium quality service.
//             </p>
//           </div>

//           {/* CARD 3 */}
//           <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
//             <FaCar className="text-5xl text-orange-500 mx-auto mb-5" />
//             <h3 className="text-xl font-semibold mb-2">Vehicle Inspection</h3>
//             <p className="text-gray-600">
//               Complete inspection by certified professional mechanics.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* 🔥 CTA SECTION */}
//       <section className="bg-orange-500 text-white py-16 text-center">
//         <h2 className="text-3xl font-bold mb-4">
//           Ready to Book Your Service?
//         </h2>
//         <p className="mb-6 text-lg">
//           Find the best garages near you and book instantly.
//         </p>
//         <button
//           onClick={() => navigate("/garages")}
//           className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
//         >
//           Explore Garages
//         </button>
//       </section>

//       {/* 🔥 FOOTER */}
//       <footer className="bg-slate-900 text-gray-300 text-center py-6">
//         <p className="text-sm">
//           © 2026 <span className="text-orange-400 font-semibold">E-Garage</span>. All Rights Reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default Home;









import React, { useState } from "react";
import { FaCar, FaTools, FaOilCan, FaSearchLocation, FaArrowRight, FaShieldAlt, FaClock, FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
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
    <div className="bg-white min-h-screen font-sans">
      {/* 🔥 HERO SECTION WITH MODERN GRID BACKGROUND */}
      <section className="relative pt-20 pb-8 px-6 md:px-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Find Trusted{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Garages</span>
              <br />
              Near You 🚗
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0">
              Book vehicle services quickly & easily with E-Garage. Professional mechanics, transparent pricing, and quality service guaranteed.
            </p>
            
            {/* 🔥 SEARCH BAR - PREMIUM VERSION */}
            <div className="bg-white rounded-2xl shadow-xl p-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="pl-4 text-gray-400">
                  <FaSearchLocation />
                </div>
                <input
                  type="text"
                  placeholder="Search garage in your city..."
                  className="flex-1 px-2 py-3 outline-none text-gray-700 placeholder:text-gray-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Search
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-green-500" />
                <span>Certified Mechanics</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>4.9 Rating (2k+ reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=500&fit=crop" 
                alt="Car repair professional"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
           
          </div>
        </div>
      </section>

      {/* 🔥 SERVICES SECTION WITH BETTER CARDS */}
      <section className="py-24 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold uppercase tracking-wide">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-800">Premium Automotive Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide comprehensive vehicle care solutions with state-of-the-art equipment and certified professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CARD 1 */}
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaTools className="text-3xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">General Repair</h3>
              <p className="text-gray-500 leading-relaxed">
                Professional repair services for all types of vehicles. From engine diagnostics to brake repairs.
              </p>
              <div className="mt-6 flex items-center text-orange-500 text-sm font-semibold gap-1 group-hover:gap-2 transition">
                Learn more <FaArrowRight size={12} />
              </div>
            </div>

            {/* CARD 2 */}
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaOilCan className="text-3xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Oil Change</h3>
              <p className="text-gray-500 leading-relaxed">
                Fast and reliable oil change with premium quality service. Using only manufacturer-recommended oils.
              </p>
              <div className="mt-6 flex items-center text-orange-500 text-sm font-semibold gap-1 group-hover:gap-2 transition">
                Learn more <FaArrowRight size={12} />
              </div>
            </div>

            {/* CARD 3 */}
            <div className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <FaCar className="text-3xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Vehicle Inspection</h3>
              <p className="text-gray-500 leading-relaxed">
                Complete inspection by certified professional mechanics. Detailed reports with actionable insights.
              </p>
              <div className="mt-6 flex items-center text-orange-500 text-sm font-semibold gap-1 group-hover:gap-2 transition">
                Learn more <FaArrowRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 HOW IT WORKS SECTION */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-semibold uppercase tracking-wide">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-800">How E-Garage Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Get your vehicle serviced in three easy steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-orange-500">1</div>
              <h3 className="text-xl font-bold mb-3">Search Garages</h3>
              <p className="text-gray-500">Find trusted garages near you based on location and services</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-orange-500">2</div>
              <h3 className="text-xl font-bold mb-3">Compare & Choose</h3>
              <p className="text-gray-500">Compare prices, read reviews, and select the best option</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold text-orange-500">3</div>
              <h3 className="text-xl font-bold mb-3">Book & Relax</h3>
              <p className="text-gray-500">Schedule your service online and get your vehicle serviced</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔥 CTA SECTION - MODERNIZED */}
      <section className="relative mx-6 md:mx-16 mb-16 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="relative py-16 px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Service?
          </h2>
          <p className="mb-8 text-lg text-orange-100 max-w-lg mx-auto">
            Join thousands of satisfied customers who trust E-Garage for their vehicle maintenance.
          </p>
          <button
            onClick={() => navigate("/garages")}
            className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition hover:scale-105 inline-flex items-center gap-2"
          >
            Explore Garages <FaArrowRight />
          </button>
        </div>
      </section>

      {/* 🔥 FOOTER - PROFESSIONAL */}
      <footer className="bg-slate-900 text-gray-400 pt-16 pb-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FaCar className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-white">E-Garage</span>
              </div>
              <p className="text-sm leading-relaxed">
                Your trusted partner for vehicle maintenance and repair services across the country.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Our Services</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Pricing</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><FaPhoneAlt size={12} /> +91 9712510388</li>
                <li className="flex items-center gap-2"><FaEnvelope size={12} /> rajputrajdip2100@gmail.com</li>
                <li className="flex items-center gap-2"><FaMapMarkerAlt size={12} /> patan , gujarat , india</li>
              </ul>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition"><FaFacebookF size={14} /></a>
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition"><FaTwitter size={14} /></a>
                <a href="#" className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition"><FaInstagram size={14} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2026 <span className="text-orange-400 font-semibold">E-Garage</span>. Created by ❤️ Rajdip Rajput</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default Home;