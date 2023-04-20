import React from 'react';
import Navbar from './components/Navbar';
import ChartDisplay from './components/ChartDisplay';
import Sidebar from './components/Sidebar';
import Systemlog from './components/Systemlog';
import { useState, useEffect, useRef } from "react";
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import GoogleButton from 'react-google-button';
import Chart from "chart.js/auto";
function App() {
  const [user, setUser] = useState({});

  function hcbResponse(response) {
    var uObject = jwt_decode(response.credential);
    setUser(uObject);
    Cookies.set('jwt_token', response.credential, { expires: 7 });
    console.log("Logging in User: ", uObject);
    document.getElementById("signInButton").hidden = true;
  }

  function signOut(event) {
    console.log("Logging out User: ", user);
    setUser({});
    Cookies.remove('jwt_token');
    document.getElementById("signInButton").hidden = false;
  }

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken) {
      const uObject = jwt_decode(jwtToken);
      setUser(uObject);
      console.log("User is already signed in: ", uObject);
      document.getElementById("signInButton").hidden = true;
    }
  }, []);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "1061531809258-v4845u688g64cv91f56jcm2m9et9k8p7.apps.googleusercontent.com",
      callback: hcbResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInButton"),
      { theme: "outline", size: "medium" }
    );
  }, []);

  useEffect(() => {
    console.log("User update:", user);
  }, [user]);

  return (
    <div className="website" style={{ backgroundColor: "#111827" }}>
      <Navbar user={user} signOut={signOut} />
      {!user.sub ? (
        <div className="flex flex-col md:flex-row px-10" style={{ height: "100vh", backgroundColor: "#111827" }}>
        <div className='md:basis-1/4 px-6' style={{ maxWidth: '40%', margin: 50, height: 50 }}> <Sidebar user={user} /> </div>
          <div className='md:basis-1/2 px-0 mr-4 md:mr-0' style={{ maxWidth: '100%', margin: 70 }}> <ChartDisplay /> </div>
          <div className='md:basis-1/4 px-1' style={{ maxWidth: '40%', margin: 50, height: 50 }}> <Systemlog /> </div>
        </div>
      ) : (
        <div className="flex flex-col" style={{ height: "100vh" }}>
          <ChartDisplay />
        </div>
      )}

      <style>
        {`
          /* Adjust layout for mobile */
          @media (max-width: 768px) {
            .website {
              display: flex;
              flex-direction: column;
            }
            .flex-col-reverse {
              flex-direction: column-reverse;
            }
            .website > div:not(:first-child) {
              margin-top: 20px;
            }
            .md:basis-1\/4 {
              width: 100%;
            }
            .px-10 {
              padding: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
