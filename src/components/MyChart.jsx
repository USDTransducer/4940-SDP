import React from 'react';
import { Chart } from 'react-google-charts';

const MyChart = ({ dates, times, currents, types, intervals, users }) => {
  // Combine dates and times into a single datetime string
  const datetimes = dates.map((date, i) => new Date(`${date}T${times[i]}`));

  // Create the data table with headers and rows
  const data = [
    ['Date/Time', 'Current', { type: 'string', role: 'tooltip' }, { type: 'string', role: 'style' }],
    ...datetimes.map((datetime, i) => [
      datetime,
      currents[i],
      types[i] === 0
        ? `Auto (${intervals[i]}m)`
        : `Requested at ${datetime.toLocaleTimeString()} by ${users[i]}`,
      types[i] === 0 ? 'point {fill-color: blue;}' : 'point {fill-color: orange;}',
    ])
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          hAxis: {
            title: 'Date/Time',
            format: 'MM/dd/yyyy HH:mm:ss',
            titleTextStyle: {
              color: '#374151',
              fontWeight: 'bold',
            },
            textStyle: {
              color: '#4B5563',
            },
            gridlines: {
              color: '#E5E7EB',
            },
          },
          vAxis: {
            title: 'Current',
            titleTextStyle: {
              color: '#374151',
              fontWeight: 'bold',
            },
            textStyle: {
              color: '#4B5563',
            },
            gridlines: {
              color: '#E5E7EB',
            },
          },
          tooltip: {
            isHtml: true,
            trigger: 'selection',
            textStyle: {
              fontFamily: 'sans-serif',
              fontSize: 11,
              fontWeight: 'bold',
              color: '#613151',
            },
          },
          legend: {
            position: 'none',
          },
          intervals: { style: 'points', pointSize: 10 },
          pointSize: 5,
          interpolateNulls: true,
        }}
      />
    </div>
  );
};

export default MyChart;
