function Home() {
  return (
    <div>

      {/* Navbar */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between">
        <h1 className="text-xl font-bold">E-Garage</h1>
        <div className="space-x-6">
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Find the Best Garage Near You</h1>
        <p className="mb-6">Book vehicle services online easily and quickly.</p>

        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search garage in your city..."
            className="px-4 py-2 rounded text-black"
          />
          <button className="bg-orange-500 px-6 py-2 rounded hover:bg-orange-600">
            Search
          </button>
        </div>
      </section>


      {/* Services */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl text-center font-semibold mb-10">Our Services</h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">🛢 Oil Change</h3>
            <p>Professional oil change for your vehicle.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">🚗 Car Wash</h3>
            <p>Complete cleaning service for your car.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">🔧 Engine Repair</h3>
            <p>Expert engine repair and diagnostics.</p>
          </div>

        </div>
      </section>


      {/* Featured Garages */}
      <section className="py-16">
        <h2 className="text-3xl text-center font-semibold mb-10">
          Featured Garages
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Raj Auto Garage</h3>
            <p className="text-gray-600">Ahmedabad</p>
            <p className="mt-2">⭐ 4.5 Rating</p>
            <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded">
              Book Now
            </button>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Shree Car Service</h3>
            <p className="text-gray-600">Ahmedabad</p>
            <p className="mt-2">⭐ 4.2 Rating</p>
            <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded">
              Book Now
            </button>
          </div>

          <div className="border p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">AutoFix Garage</h3>
            <p className="text-gray-600">Ahmedabad</p>
            <p className="mt-2">⭐ 4.7 Rating</p>
            <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded">
              Book Now
            </button>
          </div>

        </div>
      </section>


    
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>

        <div className="space-y-2">
          {/* <p>1️⃣ Register your account</p>
          <p>2️⃣ Select a garage</p>
          <p>3️⃣ Book your service</p>
          <p>4️⃣ Get your vehicle serviced</p> */}
          {/* How It Works Section */}
<section className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
      How It Works
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Step 1 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">1️⃣</div>
        <h3 className="text-xl font-semibold mb-2">Register</h3>
        <p className="text-gray-600 text-sm">
          Create your account quickly to start booking vehicle services.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">2️⃣</div>
        <h3 className="text-xl font-semibold mb-2">Select Garage</h3>
        <p className="text-gray-600 text-sm">
          Choose a nearby garage that provides the service you need.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">3️⃣</div>
        <h3 className="text-xl font-semibold mb-2">Book Service</h3>
        <p className="text-gray-600 text-sm">
          Pick a service and schedule your booking online easily.
        </p>
      </div>

      {/* Step 4 */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
        <div className="text-4xl mb-4">4️⃣</div>
        <h3 className="text-xl font-semibold mb-2">Get Serviced</h3>
        <p className="text-gray-600 text-sm">
          Visit the garage and get your vehicle serviced by professionals.
        </p>
      </div>

    </div>
  </div>
</section>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-900 text-white py-6 text-center">
        <p>© 2026 E-Garage Project</p>
      </footer>

    </div>
  );
}

export default Home;



