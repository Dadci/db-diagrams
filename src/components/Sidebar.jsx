import React from 'react'

const Sidebar = () => {
    return (
        <>
      <section>
        <div className="flex md:min-h-screen">
          {/* Sidebar */}
          <aside className="w-40 md:w-80 bg-white p-2 md:p-10 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <svg
                className="max-w-36 mx-auto"
                width="146"
                height="32"
                viewBox="0 0 146 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG content */}
              </svg>

              <nav className="md:mt-10 mt-5">
                <ul className="space-y-4 mb-4">
                  <li className="font-semibold px-3 py-2 text-black">Main</li>
                  <li className="group flex items-center text-sm md:text-base px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Overview
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Orders
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Products
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Customers
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Reports
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Transactions
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Shipment
                  </li>
                </ul>

                <ul className="space-y-4">
                  <li className="font-semibold px-3 py-2 text-black">Others</li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Help Center
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Settings
                  </li>
                  <li className="group flex items-center px-3 py-2 text-gray-500 hover:bg-black hover:text-white rounded-lg">
                    <div className="w-2 h-2 md:w-4 md:h-4 mr-2 border rounded-full border-gray-500 group-hover:border-white"></div>
                    Logout
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gradient px-3 py-2 mt-10 flex-col text-black rounded-lg">
              <img
                className="w-10 h-16 mx-auto mt-10 mb-4"
                src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2F23.png?alt=media&token=4ff84c15-7499-4eb2-a889-afa310333a59"
                alt="logo"
              />

              <p className="text-center">
                Upgrade to <span className="font-bold">PRO</span> to get all the
                features
              </p>

              <button className="font-bold text-center mt-6 pb-10">
                Upgrade Now
              </button>
            </div>
          </aside>

          {/* Main Content */}
          
        </div>
      </section>

      <style>{`
        .gradient {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(246, 246, 246, 1) 94%</div>
            );
        }
        `}</style>
    </>

    )
}

export default Sidebar