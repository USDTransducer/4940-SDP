import React, { useState } from 'react';
import { Modal } from 'flowbite';
import axios from 'axios'; // import axios to make HTTP request

//staging changes
const Sidebar = () => {

  const clearDatbase = async () => {
    const confirmDelete = window.confirm('Are you sure you want to clear the database? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await axios.delete('https://sheet.best/api/sheets/db0f2840-a783-4a03-999d-3aafd2b3539f/type/*'); // Make a DELETE request to your backend API
        alert('Data cleared successfully!');
      } catch (error) {
        console.error(error);
        alert('Data not cleared, error')
      }
    }
  }
  
  const [modal, setModal] = useState(false);
  const toggleModal = () => 
  {
    setModal (!modal)
  }


  return (
    
    <div class="Sidebar w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor: "#4B5563"}} >
        <h5 class="mb-3 text-base font-semibold text-white md:text-xl dark:text-white">
            Device: Arduino Nano RP2040 Connect <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
        </a>
        </h5>

        <p class="text-sm font-normal text-white dark:text-gray-400">Status: Online</p>
        <p class="text-sm font-normal text-white dark:text-gray-400">Uptime: 15 days 10 hours</p>
        <ul class="my-4 space-y-3">
            <li>
            
            </li>
            <p class="text-sm font-normal text-white dark:text-gray-400">Next Data Reading: 10 minutes</p>

            <li>
            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              Change Interval
            </button>
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-screen hidden">
                <div class="relative w-full max-w-md max-h-full">

                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="px-6 py-6 lg:px-8">
                            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Change Interval</h3>
                            <form class="space-y-6" action="#">
                                <div>
                                    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required></input>
                                </div>
                                <div class="flex justify-between"> <div class="flex items-start"> </div> </div>
                                  <div class="text-center">
                                      <div class="inline-flex rounded-md shadow-sm" role="group">
                                        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                          Seconds
                                        </button>
                                        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                          Minutes
                                        </button>
                                      </div>
                                    </div>



                                <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Set Interval</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
  
            </li>

            <p class="text-sm font-normal text-white dark:text-gray-400">Last Reading: 60 seconds</p>

            <li>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">                  
                  Get Reading
                </button>
            </li>
            <p class="text-sm font-normal text-white dark:text-gray-400">Last Cleared / # of Data Entries Stored</p>


            <div>
            {/* rest of the component code */}
            <button type="button" onClick={clearDatbase} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Clear Database 
            </button>
            {/* rest of the component code */}
            </div>

        </ul>
        <div>
            <a href="#" class="inline-flex items-center text-xs font-normal text-white hover:underline dark:text-gray-400">
                <svg class="w-3 h-3 mr-2" aria-hidden="true" focusable="false" data-prefix="far" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg>
                FAQ?</a>
        </div>
        </div>



  );
}

export default Sidebar;

