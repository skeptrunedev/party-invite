import './App.css';
import 'react-phone-input-2/lib/style.css'
import React, {useState} from "react"; 
import PhoneInput from 'react-phone-input-2'

function App() {
  const [number, setNumber] = useState("");
  const [setBody] = useState("");

  const onSubmit = async (e) => {
    await e.preventDefault();

    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: number}),
    });

    const data = await res.json();

    if (data.success) {
      await setNumber("");
      await setBody("");
    } else {
      await setNumber("An Error has occurred.");
      await setBody("An Error has occurred.");
    }
  };

  return (
    <div class="content"> 
      <div class="header"> 
        <img id="illuminati_icon" src='https://www.nicholaskhami.com/images/illuminati_icon.png' alt="illuminati"/> 
        <p> Conspiracy Party </p> 
      </div> 

      <div class="message"> 
        <img id="jre_aliens" src='https://www.nicholaskhami.com/images/jre_aliens.jpg' alt="illuminati"/> 
        <p> Dress Up to Rep Your Favorite Conspiracy </p>
      </div> 

      <div class="phone_form"> 
        <PhoneInput country='us' placeholder="Enter Phone Number" countryCodeEditable="false" regions={['america', 'europe', 'asia', 'oceania', 'africa']} value={number} onChange={setNumber} />
        <button class="submit" onClick={onSubmit}> RSVP FOR LOCATION </button>
        <p class="attendeeCount">Current Attendee Count: 12</p> 
      </div> 

      <div class="footer"> 
        {/* <img id="illuminati_icon" src='https://www.nicholaskhami.com/images/illuminati_icon.png' alt="illuminati"/>  */}
        <p> Saturday, August 21 10pm</p> 
      </div> 
    </div> 
  )
}

export default App;
