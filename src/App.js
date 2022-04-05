import './App.css';
import 'react-phone-input-2/lib/style.css'
import React, {useState} from "react"; 
import PhoneInput from 'react-phone-input-2'
import ReactGA from 'react-ga'; 

function App() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidPhoneNumber(p) {
    const regexFilter = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]{8,14}$/g;
    return regexFilter.test(p);
  }

  const onSubmit = async (e) => {
    document.getElementById('nameInput').classList.remove("error");
    document.getElementById("phoneInput").classList.remove("error"); 

    if(name !== '' && isValidPhoneNumber(number)) {
      await e.preventDefault();
      setLoading(true);

      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: number, name: name}),
      });

      const data = await res.json();

      if (data.success) {
        setNumber("+1");
        setName("");
      } else {
        console.log("failure with data: " + data);
      }

      setLoading(false);
    }
    else {
      if(name === '') {
        document.getElementById('nameInput').classList.add("error");
      }
      if(number.length !== 11) {
        document.getElementById("phoneInput").classList.add("error"); 
      }
    }
  };

  ReactGA.initialize('UA-154971148-8'); 
  ReactGA.pageview(window.location.pathname + window.location.search);

  function getButtonText() {
    if(loading) {
      return "SENDING CONFIRMATION...";
    }
    return "RSVP FOR LOCATION";
  }

  return (
    <div className="content"> 
      <div className="header"> 
        <div className="header_icon">
          <img id="illuminati_icon" src='https://www.nicholaskhami.com/images/illuminati_icon_yellow.png' alt="illuminati"/> 
          <p> Conspiracy Party </p> 
        </div> 
        <p id="time"> Saturday, August 21 10pm</p> 
      </div> 

      <div className="message"> 
        <img id="jre_aliens" src='https://www.nicholaskhami.com/images/jre_aliens.jpg' alt="illuminati"/> 
        <p> Dress Up to Rep Your Favorite Conspiracy </p>
      </div> 

      <div className="phone_container">
        <div className="phone_form"> 
          <div id="inputs">
            <span id="phoneInput"> 
              <PhoneInput country='us' placeholder="(000) 000-0000" regions={['america', 'europe', 'asia', 'oceania', 'africa']} value={number} onChange={setNumber} />
            </span> 
            <input className="name" id="nameInput" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
          </div> 
          <button className={loading ? "submit animate-flicker" : "submit submit-active"} disabled={loading} onClick={loading ? () => {} : onSubmit}> {getButtonText()} </button>
          <p className="attendeeCount">Current Attendee Count: 14</p> 
        </div> 
      </div> 

      <div className="footer"> 
        <div className="header_icon">
          <img id="illuminati_icon" src='https://www.nicholaskhami.com/images/illuminati_icon_yellow.png' alt="illuminati"/> 
          <p> Conspiracy Party </p> 
        </div>  
      </div> 
    </div> 
  )
}

export default App;
