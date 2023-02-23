import React from 'react';
import Chart from 'react-google-charts'
import Navbar from './components/Navbar';
import ChartDisplay from './components/ChartDisplay';
import Controls from './components/Controls';

function App() {

  return (
    <div className="website">
      <Navbar />
      <div className="flex flex-row mx-auto px-10 bg-green-300">
        <div className='basis-1/4 md:basis-1/4 px-4'> <Controls /> </div>
        <div className='basis-1/2 md:basis-1/2 px-4'> <ChartDisplay /> </div>
        <div className='basis-1/4 md:basis-1/4 px-4'> System Log </div>
      </div>
    </div>
  )
}

export default App
