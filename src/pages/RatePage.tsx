import { useEffect, useState } from "react";
import { ethers } from "ethers";

import Logo from "../assets/daolingo_logo.png";

import './RatePage.css'

function RatePage({ nextStep,
  flowRate,
  setFlowRate,
}) {


  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay.toString());
  };
  const symbol = '$G' // add dropdown with other currencies
  return (
    <div className="RatePage">

      <h3>Set your rate per minute</h3>
      <div>
        <input value={flowRate} onChange={handleFlowRateChange}></input>
        <span className='coin'>{symbol}</span>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => { nextStep(2) }}>NEXT</button>
    </div>
  );
}

export default RatePage;
