import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Systemlog = () => {
  const command_sheet = "https://sheet.best/api/sheets/eeff728c-9803-48ef-ab43-cb89a20a8ad1"
  const [logData, setLogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const response = await axios.get(command_sheet);
        setLogData(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchLogData();
  }, []);

  const groupLogsByDate = (logs) => {
    return logs.reduce((result, log) => {
      const date = log.date;
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(log);
      return result;
    }, {});
  };

  const getMessage = (log) => {
    const { date, time, type, interval, user} = log;
    switch (type) {
      case '-1':
        return <p><span className="text-blue-500">{time}</span>: Reading requested by {user} </p>;
      case '1':
        return <p><span className="text-blue-500">{time}</span>: Interval changed to {interval} by {user}</p>;
      case '2':
        return <p><span className="text-blue-500">{time}</span>: Database cleared by {user}</p>;
      default:
        return '';
    }
  };

  const handleToggleRow = (date) => {
    if (expandedRows.includes(date)) {
      setExpandedRows(expandedRows.filter((row) => row !== date));
    } else {
      setExpandedRows([...expandedRows, date]);
    }
  };

  const groupedLogs = groupLogsByDate(logData);

  return (
    <div className="Sidebar w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{backgroundColor: "#4B5563"}} >
      <h5 className="mb-3 text-base font-semibold text-white md:text-xl dark:text-white text-center">
        System log <a href="#" className="inline-flex items-center text-blue-600 hover:underline"></a>
      </h5>
      <div className="max-w-screen-lg mx-auto py-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="max-h-80 overflow-y-scroll scrollbar-thumb-rounded scrollbar-track-gray-500 scrollbar-thumb-gray-700">
            {Object.keys(groupedLogs).slice(0, 10).map((date) => {
              const logs = groupedLogs[date];
              let count = 0;
              logs.forEach((log) => {
                if (getMessage(log) !== '') {
                  count++;
                }
              });
              const isExpanded = expandedRows.includes(date);
              return (
                <div key={date} className="mb-4">
                  <button
                    onClick={() => handleToggleRow(date)}
                    className="w-full py-3 text-white font-medium hover:text-gray-400 text-center border border-gray-400 rounded-md focus:outline-none"
                    style={{ backgroundColor: '#4a5568' }}
                  >
                    <div className="flex items-center justify-between">
                      <div>{date} ({count})</div>
                      <div className="ml-2">{isExpanded ? '-' : '+'}</div>
                    </div>
                  </button>
                  <div className={isExpanded ? "max-h-58 overflow-y-scroll bg-gray-700 rounded-md p-4" : "hidden"}>
                    {logs.map((log, index) => {
                      const message = getMessage(log);
                      if (message === '') {
                        return null;
                      }
                      return (
                        <div
                          key={`${date}-${index}`}
                          className="text-sm text-gray-400 mt-2"
                        >
                          <div className="text-base font-medium">{message}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );      
}
  
export default Systemlog
