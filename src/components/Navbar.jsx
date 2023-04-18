import React from 'react';

function Navbar({ user, signOut }) {
    console.log("User obj: ", user);
  return (
    <nav className="px-2 py-1 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" style={{ backgroundColor: "#1F2937" }}>
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <img src="https://www.engr.uconn.edu/wp-content/uploads/2019/01/uconn-soe1-300x108.png" className="h-6 mr-3 sm:h-10" alt="Logo" />
          <span className="self-center text-xl whitespace-nowrap dark:text-white text-white">IoT Wireless Transducer</span>
        </a>
        {user === undefined  && <div id = "signDiv"></div>}
        {user !== undefined &&
          <div className="flex items-center">
            <span className="mr-3 text-gray-600">Signed in as {user.name}</span>
            <button onClick={(e) => signOut(e)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center">
              <svg className="h-5 w-5 mr-2 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 7.293a1 1 0 00-1.414 0L9 9.586V4a1 1 0 00-2 0v5.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-600">Sign out</span>
            </button>
          </div>
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
