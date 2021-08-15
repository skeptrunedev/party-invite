import './App.css';
import 'react-phone-input-2/lib/style.css'
import React, {useState} from "react"; 
import PhoneInput from 'react-phone-input-2'

function App() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    document.getElementById('nameInput').classList.remove("error");
    document.getElementById("phoneInput").classList.remove("error"); 

    if(name !== '' && number.length === 11) {
      await e.preventDefault();

      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: number, name: name}),
      });

      const data = await res.json();

      if (data.success) {
        await setNumber("");
        await setName("");
      } else {
        console.log("failure with data: " + data);
      }
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
          <button className="submit" onClick={onSubmit}> RSVP FOR LOCATION </button>
          <p className="attendeeCount">Current Attendee Count: 12</p> 
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
