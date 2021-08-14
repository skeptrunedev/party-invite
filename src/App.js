import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css'
import React, {useState} from "react"; 
import PhoneInput from 'react-phone-number-input'; 

function App() {
  const [number, setNumber] = useState("");
  const [body, setBody] = useState("");

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
        <PhoneInput defaultCountry="US" placeholder="Enter Phone Number" value={number} onChange={setNumber} />
        <button onClick={onSubmit}> RSVP FOR LOCATION </button>
      </div> 

      <div class="footer"> 
        {/* <img id="illuminati_icon" src='https://www.nicholaskhami.com/images/illuminati_icon.png' alt="illuminati"/>  */}
        <p> Saturday, August 21 10pm</p> 
      </div> 
    </div> 
  )
}

export default App;
