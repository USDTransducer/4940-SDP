import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Systemlog = () => {
  const command_sheet = "https://sheet.best/api/sheets/eeff728c-9803-48ef-ab43-cb89a20a8ad1"
  const [logData, setLogData] = useState([]);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await axios.get(
          command_sheet,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setLogData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLogData();
  }, []);

  const getMessage = (log) => {
    const { date, user, time, interval, type } = log;
    console.log("LG",logData);

    switch (type) {
      case -1:
        return `${date}: Reading requested by ${user} at ${time}`;
      case 1:
        return `${date}: Interval changed to ${interval} by ${user} at ${time}`;
      case 2:
        return `${date}: Database cleared by ${user} at ${time}`;
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor: "#4B5563"}}>
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-white dark:text-white">System Log</h5>

        <a href="#" className="inline-flex items-center text-blue-600 hover:underline"> View All </a>
      </div>

      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {logData.map((log, index) => (
            <li key={index} className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate dark:text-white">{getMessage(log)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Systemlog;
