import React from 'react';
import Chart from 'react-google-charts'
import Navbar from './components/Navbar';
import ChartDisplay from './components/ChartDisplay';
import Controls from './components/Controls';
import Sidebar from './components/Sidebar';
import Systemlog from './components/Systemlog';
import Login from './components/Login';
function App() {
//bg-gray-300
  return (
    <div className="website" style={{ backgroundColor: "#111827" }}>
      <Navbar />
      <div className="flex flex-col md:flex-row px-10" style={{ height: "100vh" , backgroundColor: "#111827"}}>
        <div className='md:basis-1/4 px-4' style={{maxWidth: '50%', margin: 50, height: 50}}> <Sidebar /> </div>
        <div className='md:basis-1/2 px-4 mr-4 md:mr-0' style={{ maxWidth: '100%', margin: 'auto' }}> <ChartDisplay /> </div>
        <div className='md:basis-1/4 px-4'style={{maxWidth: '50%', margin: 50, height: 50}}> <Systemlog /> </div>
      </div>
    </div>
  )
}

export default App
