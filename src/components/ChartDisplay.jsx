import { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';

const ChartDisplay = () => {
  const [chartData, setChartData] = useState(null);
  const [chartWidth, setChartWidth] = useState(null);
  const [chartHeight, setChartHeight] = useState(null);
  const chartRef = useRef(null);
  Chart.register(zoomPlugin);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://sheet.best/api/sheets/db0f2840-a783-4a03-999d-3aafd2b3539f");
      const data = await response.json();
      const labels = data.map((row) => row.date);
      const time = data.map((row) => row.time);
      const values = data.map((row) => row.current);
      const type = data.map((row) => row.type);
      const interval = data.map((row) => row.interval);
      const user = data.map((row) => row.user);
      setChartData({ labels, time, values, type, interval, user });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const chartBox = document.querySelector('.chartbox');
    setChartWidth(chartBox.clientWidth);
    setChartHeight(chartBox.clientHeight);
  
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setChartWidth(width);
      setChartHeight(height);
      chartRef.current.update()
    });
  
    resizeObserver.observe(chartBox);
  }, []);
  
  useEffect(() => {
    if (!chartData) return;
    if (chartRef.current) chartRef.current.destroy();
    const labels = chartData.labels;
    const values = chartData.values;
    const pointBackgroundColor = chartData.type.map((t) => {
      return t === '0' ? 'red' : 'blue';
    });
    
    // wait until chartWidth and chartHeight have been updated before rendering the chart
    if (chartWidth && chartHeight) {
      chartRef.current = new Chart("CurrentChart", {
        type: "line",
        data: { labels, datasets: [{label: "Current: ", data: values, borderColor: "rgb(75, 192, 192)", tension: 0.1,pointBackgroundColor: pointBackgroundColor}] },
        options: {
          maintainAspectRatio: false,
          layout: {
            autoPadding: true,
          },
          scales: {
            x: {
              title: { display: false, text: "Days of the week" },
              min: 0,        // set the minimum value of the x-axis to 0
              max: 30,       // set the maximum value of the x-axis to 30
              ticks: { maxTicksLimit: 10 }
            },
          y: 
            { title: { display: true, text: "Current reading (amps)" }, } },
          animation: false,
          plugins: {
            zoom: {
              zoom:{
                wheel:{
                  enabled: true,
                },
                pinch:{
                  enabled:true,
                },
                mode: 'x',
              },
              pan:{
                enabled:true,
                mode: 'x',              
              },
            },
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
    }
  }, [chartData, chartWidth, chartHeight]);
  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:w-1/8 mb-8">
        <div className="chartbox"> <canvas id="CurrentChart" width="600" height="650"></canvas> </div>
      </div>
    </div>
  );
};

export default ChartDisplay;
