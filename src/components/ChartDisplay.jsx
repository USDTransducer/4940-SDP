import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import MyChart from "./MyChart";

function ChartDisplay() {
  const [chartData, setChartData] = useState(null);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [currents, setCurrents] = useState([]);
  const [types, setTypes] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("dates", dates);
    async function fetchData() {
      try {
        const response = await fetch("https://sheet.best/api/sheets/794f1ec2-1029-4bb3-94cb-34e96fe5a0cd");
        const data = await response.json();
        console.log(response)
        const newDates = [];
        const newTimes = [];
        const newCurrents = [];
        const newTypes = [];
        const newIntervals = [];
        const newUsers = [];

        data.forEach((item) => {
          newDates.push(item.Date);
          newTimes.push(item.Time);
          newCurrents.push(parseInt(item.Current));
          newTypes.push(parseInt(item.Type));
          newIntervals.push(parseInt(item.Interval));
          newUsers.push(item.User);
        });

        setDates(newDates);
        setTimes(newTimes);
        setCurrents(newCurrents);
        setTypes(newTypes);
        setIntervals(newIntervals);
        setUsers(newUsers);
        console.log("Diagnostic");
        const chartData = [["Date","Time", "Current","Type","Interval","User"]];
        console.log(chartData);
        data.forEach((item) => {
          chartData.push([item.Date, item.Time, parseInt(item.Current), parseInt(item.Type), parseInt(item.Interval)], item.User);
        });
        console.log(chartData);
        console.log("dates");
        console.log(dates);
        setChartData(chartData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <MyChart dates={dates} times={times} currents={currents} types={types} intervals={intervals} users={users}/>

    </div>
  );
}
export default ChartDisplay;