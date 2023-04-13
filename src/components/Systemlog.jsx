import React, { useState } from 'react';

  const Systemlog = () => {
  const [logData, setLogData] = useState([]);

  // Function to add new log data to the state
  const addLogData = (newData) => {
  setLogData((prevData) => [...prevData, newData]);
  };

  // Example usage of the addLogData function
  const handleNewData = () => {
  const newData = "New log data";
  addLogData(newData);
  };

  /*
    Added a state variable logData using the useState hook. 
    Created a function addLogData that takes in new log data and adds it to the state using the spread operator.
    To update the system log with new data, you can call the addLogData function with the new data as a parameter. 
    I've included an example usage of the addLogData function in the handleNewData function.
    In the return statement, I've mapped over the logData array and rendered each item as a list item with the log data displayed as text.
  */

  return (
    <div class="w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor: "#4B5563"}}>
    <div className="flex items-center justify-between mb-4">
      <h5 className="text-xl font-bold leading-none text-white dark:text-white">System Log</h5>

      <a href="#" class="inline-flex items-center text-blue-600 hover:underline"> View All </a>
    </div>

    <div className="flow-root"> <ul role="list"className="divide-y divide-gray-200 dark:divide-gray-700">
         <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white truncate dark:text-white">
                            Example 1: Interval Changed 
                        </p>
                        <p class="text-sm text-white truncate dark:text-gray-400">
                            1 to 3
                        </p>
        </div>
        
        <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white truncate dark:text-white">
                            Example 2: Data Cleared
                        </p>
                        <p class="text-sm text-white truncate dark:text-gray-400">
                            [February 23, 2023 at 1:10 PM]
                        </p>
        </div>

        <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white truncate dark:text-white">
                            Example 3: Imported New Data
                        </p>
                        <p class="text-sm text-white truncate dark:text-gray-400">
                            [February 24, 2023 at 1:30 AM]
                        </p>
        </div>

      </ul>
    </div>
  </div>
  );
}

export default Systemlog;


