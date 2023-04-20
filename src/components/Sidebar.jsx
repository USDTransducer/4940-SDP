import React, { useState, useEffect } from 'react';
import axios from 'axios'; // import axios to make HTTP request
import Chart from "chart.js/auto";

//staging changes
const Sidebar = ({ user }) => {
  const command_sheet = 'https://sheet.best/api/sheets/eeff728c-9803-48ef-ab43-cb89a20a8ad1';
  const data_sheet = 'https://sheet.best/api/sheets/db0f2840-a783-4a03-999d-3aafd2b3539f';

  const [uptime, setUpTime] = useState([]);
  const [nextReading, setNextReading] = useState([]);
  const [lastReading, setLastReading] = useState([]);
  const [total, setTotal] = useState([]);
  const [timeSinceLastEntry, setTimeSinceLastEntry] = useState(null);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await fetch("https://sheet.best/api/sheets/db0f2840-a783-4a03-999d-3aafd2b3539f");
        const data = await response.json();
        const rows = data.map((row) => row.time);
        const rowsint = data.map((row) => row.interval);
        const lastTime = rows.slice(-1)[0];
        const lastInt = rowsint.slice(-1)[0];
        const [hours, minutes, seconds] = lastTime.split(':');
        const dateObj = new Date();
        dateObj.setHours(hours, minutes, seconds);
        setLastReading(dateObj);
        const currentTime = new Date();
        const timeDiff = Math.abs(currentTime - dateObj);
        const hoursDiff = Math.floor(timeDiff / (60 * 60 * 1000));
        const minutesDiff = Math.floor((timeDiff % (60 * 60 * 1000)) / (60 * 1000));
        const secondsDiff = Math.floor((timeDiff % (60 * 1000)) / 1000);
        const timeSinceLastEntry = `${hoursDiff} hours, ${minutesDiff} minutes`;
        setTimeSinceLastEntry(timeSinceLastEntry);
        setTotal(rows.length);
        console.log("Time since last entry:", timeSinceLastEntry);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogData();
  }, []);
  

  const clearDatbase = async () => {
    const confirmDelete = window.confirm('Are you sure you want to clear the database? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await axios.delete(data_sheet + "/type/*"); // Delete
        alert('Data cleared successfully!');
        try{
          await axios.post(command_sheet,
            {
              'date': new Date().toLocaleDateString(),
              'time': new Date().toLocaleTimeString(),
              'type': '2',
              'interval': '-24',
              'user': user.name,
          })
        }
        catch (error){
          console.error(error);
          alert('Not logged error: ' + error);
        }
      } catch (error) {
        console.error(error);
        alert('Data not cleared, error: ' + error);
      }
      location.reload();
    }
  }
  const getReading = async () => {
      try {
        console.log("user",user);
        await axios.post(command_sheet,
        {
            'date': new Date().toLocaleDateString(),
            'time': new Date().toLocaleTimeString(),
            'type': '-1',
            'interval': '-24',
            'user': user.name,
        })
      } catch (error) {
        console.error(error);
        alert('Reading not taken error: ' + error);
      }
      location.reload();
  }
  const changeInterval = async () => {
      try {
        await axios.post(command_sheet,
        {
            'date': new Date().toLocaleDateString(),
            'time': new Date().toLocaleTimeString(),
            'type': '1',
            'interval': '100',
            'user': user.name,
        })
      } catch (error) {
        console.error(error);
        alert('Interval not changed error: ' + error);
      }
      location.reload();
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
                                          Minutes
                                        </button>
                                        <button type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                          Hours
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
            <p class="text-sm font-normal text-white dark:text-gray-400">Last Reading: {timeSinceLastEntry} </p>
            <li>
            <button type="button" onClick={getReading} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">                  
                  Get Reading
                </button>
            </li>
            <p class="text-sm font-normal text-white dark:text-gray-400"> Total readings: {rows.length}</p>
            <div>
            <button type="button" onClick={clearDatbase} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Clear Database 
            </button>
            </div>
        </ul>
        </div>
  );
}

export default Sidebar;

