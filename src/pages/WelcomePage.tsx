import { useEffect, useState } from "react";

import './WelcomePage.css'

function WelcomePage({ nextStep, connectToHuddle, setRoomURL, roomURL }) {
  return (
    <div className="WelcomePage">

      <h1>Unlock the World</h1>

      <h3>Connect, practice, and Learn Different Languages with Ease</h3>

      <div>
        <input
          type="text"
          value={roomURL}
          onChange={(e: { target: { value: any; }; }) => setRoomURL(e.target.value)}
          placeholder="Room URL"
        />
      </div>
      <button onClick={() => {
        connectToHuddle();
        nextStep(1);
        }}>Connect</button>

      <div className="tutor">Connect as tutor</div>

    </div>
  );
}

export default WelcomePage;
