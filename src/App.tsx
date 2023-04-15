import { useEffect, useState } from "react";
import "./App.css";
import Logo from "./assets/daolingo_logo.png";

import {
  huddleIframeApp,
  HuddleAppEvent,
  HuddleIframe,
  IframeConfig,
  HuddleClientMethodName,
} from "@huddle01/huddle01-iframe";
import { CreateFlow } from "./components/createFlow";
import WelcomePage from './pages/WelcomePage'
import RatePage from './pages/RatePage'


function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [roomURL, setRoomURL] = useState("");
  const [joinRoom, setJoinRoom] = useState(false);
  const [recipient, setRecipient] = useState("0x4606C1e6E956BE55a7D9024a0c6e218c588285d3");
  const [flowRate, setFlowRate] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  
  const iframeConfig: IframeConfig = {
    roomUrl: roomURL,
    height: "600px",
    width: "80%",
  };

  useEffect(() => {
    huddleIframeApp.on(HuddleAppEvent.PEER_JOIN, (data: any) => {
      console.log('PEER JOIN ', data)
      createNewFlow(recipient, flowRate)
    });

    huddleIframeApp.on(HuddleAppEvent.PEER_LEFT, (data: any) =>
      deleteExistingFlow(recipient)
    );
  }, []);

  const nextStep = (step) => {
    setCurrentStepIndex(step)
  }

  const renderHuddleIframe = () =>
    <HuddleIframe config={iframeConfig} />
    

  const currentStep = [
    <WelcomePage
      roomURL={roomURL}
      setRoomURL={setRoomURL}
      nextStep={nextStep}
      connectToHuddle={
        () => {
          huddleIframeApp.methods.connectWallet(currentAccount)
        }
      }
    />,
    <RatePage
      nextStep={nextStep}
      flowRate={flowRate}
      setFlowRate={setFlowRate}
    />,
    <HuddleIframe config={iframeConfig} />,
  ]

  console.log('currentStep', currentStep, 'currentStepIndex', currentStepIndex)

  return (
    <div className="App">
      <img src={Logo} width="410" />
      <div className="container">
        {currentStep[currentStepIndex]}
        
        {/* <span>
          <input
            type="text"
            value={roomURL}
            onChange={(e: { target: { value: any; }; }) => setRoomURL(e.target.value)}
            placeholder="Room URL"
          />
        </span>

        <input
          type="text"
          value={currentAccount}
          onChange={(e: { target: { value: any; }; }) => setCurrentAccount(e.target.value)}
          placeholder="Wallet Address"
        />

        <button
          onClick={() => {
            huddleIframeApp.methods.connectWallet(currentAccount)
            setJoinRoom(true)
          }}
        >
          Find Teacher
        </button>

        {joinRoom && <HuddleIframe config={iframeConfig} />}
        <CreateFlow
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
          recipient={recipient}
          setRecipient={setRecipient}
          flowRate={flowRate}
          setFlowRate={setFlowRate} /> */}
      </div>
    </div>
  );
}

export default App;
