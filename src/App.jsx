import React from 'react';
import Chart from 'react-google-charts'
import Navbar from './components/Navbar';
import ChartDisplay from './components/ChartDisplay';
import Controls from './components/Controls';
import Sidebar from './components/Sidebar';
import Systemlog from './components/Systemlog';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

// client_id: "1061531809258-v4845u688g64cv91f56jcm2m9et9k8p7.apps.googleusercontent.com"
function App() {
  const [user, setUser] = useState({});

  function hcbResponse(response){
    console.log("JTW",response.credential);
    var uObject = jwt_decode(response.credential);
    setUser(uObject);
    document.getElementById("signDiv").hidden = true;
  }
  function signOut(event){
    setUser({});
    document.getElementById("signDiv").hidden = false;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1061531809258-v4845u688g64cv91f56jcm2m9et9k8p7.apps.googleusercontent.com",
      callback: hcbResponse
    })
  
    google.accounts.id.renderButton(
      document.getElementById("signDiv"),
      {theme:"outline",size:"medium"}
    );
  }, []);
  
  return (
    <div className="website" style={{ backgroundColor: "#111827" }}>
      <Navbar />
      <div className="flex flex-col md:flex-row px-10" style={{ height: "100vh" , backgroundColor: "#111827"}}>
        <div className='md:basis-1/4 px-4' style={{maxWidth: '50%', margin: 50, height: 50}}> <Sidebar user={user} signOut={signOut}/> </div>
        <div className='md:basis-1/2 px-4 mr-4 md:mr-0' style={{ maxWidth: '100%', margin: 'auto' }}> <ChartDisplay /> </div>
        <div className='md:basis-1/4 px-4'style={{maxWidth: '50%', margin: 50, height: 50}}> <Systemlog /> </div>
      </div>
    </div>
  )
}

export default App
