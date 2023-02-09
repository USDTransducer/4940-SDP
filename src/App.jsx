import React from 'react';
import Navbar from './components/Navbar';
import Chart from './components/Chart';
import Controls from './components/Controls';

function App() {

  return (
    <div className="website">
      <Header />
      <Navbar />
      <Chart />
      <Controls />
      <Log />
      <Footer />
    </div>
  )
}

export default App
