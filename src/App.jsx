import React from 'react';
import Chart from 'react-google-charts'
import Navbar from './components/Navbar';
import ChartDisplay from './components/ChartDisplay';
import Controls from './components/Controls';
import Sidebar from './components/Sidebar';
import Systemlog from './components/Systemlog';
import Login from './components/Login';
function App() {

  return (
    <div className="website">
      <Navbar />
      <div className="flex flex-col md:flex-row mx-auto px-10 bg-gray-300">
        <div className='md:basis-1/4 px-4'> <Sidebar /> </div>
        <div className='md:basis-1/2 px-4 mr-4 md:mr-0' style={{ maxWidth: '100%', margin: 'auto' }}> <ChartDisplay /> </div>
        <div className='md:basis-1/4 px-4'> <Systemlog /> </div>
      </div>
    </div>
  )
}

export default App
