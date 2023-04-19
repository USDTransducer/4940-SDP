import React, { useState, useEffect } from 'react';

const Systemlog = () => {
  const [logData, setLogData] = useState([]);

  // Function to add new log data to the state
  const addLogData = (newData) => {
    setLogData((prevData) => [...prevData, newData]);
  };

  // Load log data from file on component mount
  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await fetch('/log.txt');
        const data = await response.text();
        const logArray = data.split('\n');
        setLogData(logArray.filter((log) => log !== ''));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLogData();
  }, []);

  // Save log data to file on state update
  useEffect(() => {
    const saveLogData = async () => {
      try {
        const logString = logData.join('\n');
        await fetch('./log.txt', {
          method: 'POST',
          body: logString,
        });
      } catch (error) {
        console.log(error);
      }
    };
    saveLogData();
  }, [logData]);

  // Example usage of the addLogData function
  const handleNewData = () => {
    const newData = "New log data";
    addLogData(newData);
  };

  /*
    Added a state variable logData using the useState hook. 
    Created a function addLogData that takes in new log data and adds it to the state using the spread operator.
    To load log data from the file on component mount, I've added a useEffect hook with an async fetch function that gets the contents of the log.txt file and sets the state with the log data.
    To save log data to the file on state update, I've added another useEffect hook that sends a POST request with the updated log data to the log.txt file.
    I've included an example usage of the addLogData function in the handleNewData function.
    In the return statement, I've mapped over the logData array and rendered each item as a list item with the log data displayed as text.
  */

  return (
    <div class="w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor: "#4B5563"}}>
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white dark:text-white">System Log</h5>

        <a href="#" class="inline-flex items-center text-blue-600 hover:underline"> View All </a>
      </div>

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {logData.map((log, index) => (
            <li key={index} className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate dark:text-white">{log}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Systemlog;
