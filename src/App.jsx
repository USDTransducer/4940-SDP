import React from 'react';
import Navbar from './components/Navbar';
import ChartDisplay from './components/ChartDisplay';
import Sidebar from './components/Sidebar';
import Systemlog from './components/Systemlog';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState({});

  function hcbResponse(response){
    var uObject = jwt_decode(response.credential);
    setUser(uObject);
    console.log("Logging in User: ", uObject);
    document.getElementById("signInButton").hidden = true;
  }
  
  function signOut(event){
    console.log("Logging out User: ", user);
    setUser({});
    document.getElementById("signInButton").hidden = false;
  }
  
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "1061531809258-v4845u688g64cv91f56jcm2m9et9k8p7.apps.googleusercontent.com",
      callback: hcbResponse
    })
  
    google.accounts.id.renderButton(
      document.getElementById("signInButton"),
      {theme:"outline",size:"medium"}
    );
  }, []);

  useEffect(() => {
    console.log("User update:", user);
  }, [user]);
  
  return (
    <div className="website" style={{ backgroundColor: "#111827" }}>
      <Navbar user={user} signOut={signOut} />
      <div className="flex flex-col md:flex-row px-10" style={{ height: "100vh" , backgroundColor: "#111827"}}>
        <div className='md:basis-1/4 px-4' style={{maxWidth: '50%', margin: 50, height: 50}}> <Sidebar user={user} signOut={signOut}/> </div>
        <div className='md:basis-1/2 px-4 mr-4 md:mr-0' style={{ maxWidth: '100%', margin: 'auto' }}> <ChartDisplay /> </div>
        <div className='md:basis-1/4 px-4'style={{maxWidth: '50%', margin: 50, height: 50}}> <Systemlog /> </div>
      </div>
    </div>
  )
}

export default App
