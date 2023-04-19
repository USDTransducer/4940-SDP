import React from 'react';

function Navbar({ user, signOut }) {
  return (
    <>
      <nav className="px-2 py-1 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" style={{ backgroundColor: "#1F2937" }}>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="#" className="flex items-center">
            <img src="https://www.engr.uconn.edu/wp-content/uploads/2019/01/uconn-soe1-300x108.png" className="h-6 mr-3 sm:h-10" alt="Logo" />
            <span className="self-center text-xl whitespace-nowrap dark:text-white text-white">IoT Wireless Transducer</span>
          </a>
          {user && user.email ?
            <div className="flex items-center">
              <span className="text-white text-sm mr-2">Logged in as {user.given_name} {user.family_name}</span>
              <button onClick={signOut} className="bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1 rounded-md">Sign Out</button>
            </div>
            :
            <div id="signDiv"></div>
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar;
