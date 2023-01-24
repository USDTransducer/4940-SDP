import React from 'react';
import Navbar from './components/Navbar';
import Chart from './components/Chart';


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
