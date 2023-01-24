import React from 'react';

function Navbar()
{
    return(
        <nav className="px-2 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="#" class="flex items-center">
                    <img src="https://imgs.search.brave.com/cmOdScVGv7GhTgom97oTsDXR4gqQynrDHhPTKGJN6Gg/rs:fit:32:32:1/g:ce/aHR0cHM6Ly93d3cu/aWNvbmV4cGVyaWVu/Y2UuY29tL19pbWcv/b19jb2xsZWN0aW9u/X3BuZy9ncmVlbl9k/YXJrX2dyZXkvMzJ4/MzIvcGxhaW4vZ2Vh/cndoZWVscy5wbmc" class="h-6 mr-3 sm:h-10" alt="Logo" />
                    <span class="self-center text-xl whitespace-nowrap dark:text-white">Senior Design Website</span>
                </a>
                <button data-collapse-toggle="navbar-dropdown" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;