import React, { useState } from 'react';

const Systemlog = () => {

  return (
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">System Log</h5>

      <a href="#"className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">View all</a>
    </div>

    <div className="flow-root"> <ul role="list"className="divide-y divide-gray-200 dark:divide-gray-700">
         <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Example 1: Interval Changed 
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            1 to 3
                        </p>
        </div>
        
        <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Example 2: Data Cleared
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            [February 23, 2023 at 1:10 PM]
                        </p>
        </div>

        <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Example 3: Imported New Data
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            [February 24, 2023 at 1:30 AM]
                        </p>
        </div>

      </ul>
    </div>
  </div>
  );
}

export default Systemlog;


