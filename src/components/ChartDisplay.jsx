import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartDisplay = () => {
  const [chartData, setChartData] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [panningValue, setPanningValue] = useState(100);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://sheet.best/api/sheets/794f1ec2-1029-4bb3-94cb-34e96fe5a0cd");
      const data = await response.json();
      const labels = data.map((row) => row.date);
      const time = data.map((row) => row.time);
      const values = data.map((row) => row.current);
      const type = data.map((row) => row.type);
      const interval = data.map((row) => row.interval);
      const user = data.map((row) => row.user);
      setChartData({ labels, time, values, type, interval, user });
      // console.log({ labels, time, values, type, interval, user })
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!chartData) return;
    if (chartRef.current) chartRef.current.destroy();
    const numDataPoints = Math.floor((1 - sliderValue / 100) * chartData.labels.length);
    const startIndex = Math.floor((panningValue / 100) * (chartData.labels.length - numDataPoints));
    const endIndex = startIndex + numDataPoints;
    const labels = chartData.labels.slice(startIndex, endIndex);
    const values = chartData.values.slice(startIndex, endIndex);
    const pointBackgroundColor = chartData.type.map((t) => {
      return t === '0' ? 'red' : 'blue';
    });
    //console.log("CD",chartData.type);
    chartRef.current = new Chart("CurrentChart", {
      type: "line",
      data: { labels, datasets: [{label: "Current: ", data: values, borderColor: "rgb(75, 192, 192)", tension: 0.1,pointBackgroundColor: pointBackgroundColor}] },
      options: {
        layout: {
          autoPadding: true,
        },
        scales: 
        { x: 
          { title: { display: false, text: "Days of the week" }, ticks: { maxTicksLimit: 10 } }, 
        y: 
          { title: { display: true, text: "Current reading (amps)" }, } },
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                const dex = context.dataIndex;
                let label = context.dataset.label;
                label += chartData.values[dex];
                if (chartData.type[dex] === '0') {
                    label += "\n Requested by ";
                    label+= chartData.user[dex];
                }
                else{
                  label += ", every "
                  label += chartData.interval[dex]
                  label += "m"
                }
                return label;
              },
              afterLabel: function(context)
              {
                const dex = context.dataIndex;
                let footer = '';
                // console.log("Time",chartData.time);
                // console.log("index",dex)
                footer += "time = "
                footer += chartData.time[dex];
                return footer;
              },
              labelPointStyle: function(context)
              {
                if (chartData.type[context.dataIndex] === 0)
                {
                  return {
                    pointStyle: 'triangle',
                    rotation: 0,
                  };
                }
              }
             }
            }
          }
        }

    });
  }, [chartData, sliderValue, panningValue]);

  const handleSliderChange = (event) => setSliderValue(event.target.value);

  const handlePanningChange = (event) => setPanningValue(event.target.value);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-3/4 mb-8">
        <canvas id="CurrentChart" width="400" height="400"></canvas>
      </div>
      <div className="w-full md:w-3/4 flex justify-between">
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-700 mb-1">Zoom</p>
          <input type="range" min={0} max={99} value={sliderValue} onChange={handleSliderChange} className="w-full h-4 rounded-full bg-gray-300 appearance-none outline-none" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-700 mb-1">Pan</p>
          <input type="range" min={0} max={100} value={panningValue} onChange={handlePanningChange} className="w-full h-4 rounded-full bg-gray-300 appearance-none outline-none" />
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
