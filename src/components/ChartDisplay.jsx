import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

function ChartDisplay() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://sheet.best/api/sheets/794f1ec2-1029-4bb3-94cb-34e96fe5a0cd");
        const data = await response.json();
        const chartData = [["Id", "Current"]];
        data.forEach((item) => {
          chartData.push([parseInt(item.Id), parseInt(item.Current)]);
        });
        console.log(chartData)
        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h3>Chart:</h3>
      {chartData && (
        <Chart
          width={"500px"}
          height={"500px"}
          chartType="LineChart"
          data={chartData}
          options={{
            title: "Comments",
            chartArea: { width: "50%" },
            hAxis: { title: "Id", minValue: 0 },
            vAxis: { title: "Current" },
          }}
        />
      )}
    </div>
  );
}
export default ChartDisplay;