import React, { useState, useEffect } from 'react';
import axios from 'axios'; // import axios to make HTTP request
import Modal from './Modal';
import Chart from "chart.js/auto";

//staging changes
const Sidebar = ({ user }) => {
  const command_sheet = 'https://sheet.best/api/sheets/eeff728c-9803-48ef-ab43-cb89a20a8ad1';
  const data_sheet = 'https://sheet.best/api/sheets/db0f2840-a783-4a03-999d-3aafd2b3539f';

  const [uptime, setUpTime] = useState([]);
  const [nextReading, setTimeUntilNextReading] = useState([]);
  const [lastReading, setLastReading] = useState([]);
  const [total, setTotal] = useState([]);
  const [lastInterval, setLastInterval] = useState([]);
  const [timeSinceLastEntry, setTimeSinceLastEntry] = useState(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await fetch(data_sheet);
        const response_command = await fetch(command_sheet);
        const data = await response.json();
        const data_command = await response_command.json();
        const rows = data.map((row) => row.time);
        const rowsint = data.map((row) => row.interval);
        const expected_interval = data_command.map((row) => row.interval);
        const interval_updatedAt = data_command.map((row)=> row.time);

        const lastTime = rows.slice(-1)[0];
        setLastInterval(expected_interval.slice(-1)[0]);
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
  
        // Calculate time until next reading
        const intervalInSeconds = expected_interval.slice(-1)[0];
        const intervalInMinutes = intervalInSeconds / 60;
        const timeUntilNextReadingInMinutes = intervalInMinutes - minutesDiff % intervalInMinutes;
        const timeUntilNextReadingInHours = timeUntilNextReadingInMinutes / 60;
        const timeUntilNextReadingString = 
        timeUntilNextReadingInHours >= 1 
          ? `${Math.floor(timeUntilNextReadingInHours)} hours, ${Math.floor(timeUntilNextReadingInMinutes % 60)} minutes` 
          : `${Math.floor(timeUntilNextReadingInMinutes)} minutes`;
      setTimeUntilNextReading(timeUntilNextReadingString);

        // Check if online
        const lastUpdate = new Date(interval_updatedAt[interval_updatedAt.length - 1]);
        const timeSinceLastUpdate = Math.abs(currentTime - lastUpdate);
        if (timeSinceLastUpdate > expected_interval[expected_interval.length - 1] && timeSinceLastUpdate > lastUpdate) {
          setOnline(false);
        } else {
          setOnline(true);
        }
  
        console.log("Time since last entry:", timeSinceLastEntry);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLogData();
  }, []);
  
  

  const clearDatbase = async () => {
    const confirmDelete = window.confirm('Are you sure you want to clear all records? This action cannot be undone.');
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
  const changeInterval = async (newInter) => {
      try {
        console.log("new",newInter);
        await axios.post(command_sheet,
        {
            'date': new Date().toLocaleDateString(),
            'time': new Date().toLocaleTimeString(),
            'type': '1',
            'interval': newInter,
            'user': user.name,
        })
      } catch (error) {
        console.error(error);
        alert('Interval not changed error: ' + error);
      }
      location.reload();
  }

  return (
    
    <div class="Sidebar w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor: "#4B5563"}} >
        <h5 class="mb-3 text-base font-semibold text-white md:text-xl dark:text-white">
            Device: Arduino Nano RP2040 Connect <a href="#" class="inline-flex items-center text-blue-600 hover:underline">
        </a>
        </h5>

        <p class="text-sm font-normal text-white dark:text-gray-400">Status: {online ? 'Online' : 'Offline'}</p>
        <ul class="my-4 space-y-3">
            <li>
            
            </li>
            <p class="text-sm font-normal text-white dark:text-gray-400"> Current interval: {lastInterval}, Next in {nextReading}</p>

            <li>
            <Modal sendInterval={changeInterval} />
            </li>
            <p class="text-sm font-normal text-white dark:text-gray-400">Last Reading: {timeSinceLastEntry} </p>
            <li>
            <button type="button" onClick={getReading} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">                  
                  Get Reading
                </button>
            </li>
            <p class="text-sm font-normal text-white dark:text-gray-400"> Total readings: {total}</p>
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

