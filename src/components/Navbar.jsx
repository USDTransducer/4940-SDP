import React from 'react';
import { render } from 'react-dom';

function Navbar(props) {
    const { user, signOut } = props;

    function renderSignIn(){
        if (!user.email){
            document.getElementById("signInButton").hidden = true;
        }
        else{
            document.getElementById("signInButton").hidden = false;
        }
    }

    return (
        <nav className="px-2 py-1 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700" style={{ backgroundColor: "#1F2937" }}>
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <a href="#" className="flex items-center">
            <img src="https://www.engr.uconn.edu/wp-content/uploads/2019/01/uconn-soe1-300x108.png" className="h-6 mr-3 sm:h-10" alt="Logo" />
            <span className="self-center text-xl whitespace-nowrap dark:text-white text-white">IoT Wireless Transducer</span>
          </a>
          {user.email ? (
            <>
              <span className="text-white mr-4">{user.email}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={signOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <div id="signInButton"></div>
          )}
        </div>
      </nav>
    );
  }

export default Navbar;
