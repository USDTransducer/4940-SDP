import React, { useState, useEffect } from 'react';

function Modal({sendInterval}) {
  const [showModal, setShowModal] = useState(false);
  const [timeValue, setTimeValue] = useState('');
  const [timeUnit, setTimeUnit] = useState('minutes');
  const [convertedValue, setConvertedValue] = useState('');

  const convertToSeconds = () => {
    let seconds = 0;
    if (timeUnit === 'minutes') {
      seconds = parseInt(timeValue) * 60;
    } else if (timeUnit === 'hours'){
      seconds = parseInt(timeValue) * 3600;
    }
    else{
        seconds = timeValue;
    }
    setConvertedValue(seconds);
    setShowModal(false);
  };

  useEffect(() => {
    if (!showModal && convertedValue !== '') {
        sendInterval(convertedValue);
      }
  }, [showModal, convertedValue, sendInterval]);
  return (
    <div>
        <button
        onClick={() => setShowModal(!showModal)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        {showModal ? 'Close' : 'Change interval'}
        </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="mb-4">
              <label className="block mb-2 font-bold text-gray-700">
                Value:
                <input
                  type="number"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="form-input mt-1 block w-full rounded-md text-center bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                />
              </label>
              <label className="block mb-2 font-bold text-gray-700">
                Unit:
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="form-select mt-1 block w-full text-center rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </select>
              </label>
            </div>
            <button
              onClick={convertToSeconds}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;