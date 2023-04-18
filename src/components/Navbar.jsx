import React from 'react';

function Navbar({ user, signOut }) {
  return (
    <nav className="px-2 py-1 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" style={{ backgroundColor: "#1F2937" }}>
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <img src="https://www.engr.uconn.edu/wp-content/uploads/2019/01/uconn-soe1-300x108.png" className="h-6 mr-3 sm:h-10" alt="Logo" />
          <span className="self-center text-xl whitespace-nowrap dark:text-white text-white">IoT Wireless Transducer</span>
        </a>
        <div id="signDiv"></div>
        {user ?
          <button onClick={(e) => signOut(e)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Sign out</button>
          : null
        }
        <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar;
