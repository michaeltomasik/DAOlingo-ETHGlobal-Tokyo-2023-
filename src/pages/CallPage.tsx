import { useEffect, useState } from "react";

import {
  huddleIframeApp,
  HuddleAppEvent,
  HuddleIframe,
  IframeConfig,
  HuddleClientMethodName,
} from "@huddle01/huddle01-iframe";
import './WelcomePage.css'

function CallPage({ closeStream, newStream, iframeConfig }) {
  useEffect(() => {
    newStream();
  }, [])
  return (
    <div className="WelcomePage">
      <button onClick={() => {
        closeStream();
        }}>Close</button>

      <HuddleIframe config={iframeConfig} />
    </div>
  );
}

export default CallPage;
