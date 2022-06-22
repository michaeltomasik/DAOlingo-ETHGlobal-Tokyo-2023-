import { useEffect } from "react";
import "./App.css";

import {
  huddleIframeApp,
  HuddleAppEvent,
  HuddleIframe,
  IframeConfig,
  HuddleClientMethodName,
} from "@huddle01/huddle01-iframe";

function App() {
  const iframeConfig: IframeConfig = {
    roomUrl: "http://localhost:3000/test-room",
    height: "600px",
    width: "80%",
  };

  const reactions = [
    "😂",
    "😢",
    "😦",
    "😍",
    "🤔",
    "👀",
    "🙌",
    "👍",
    "👎",
    "🔥",
    "🍻",
    "🚀",
    "🎉",
    "❤️",
    "💯",
  ];

  useEffect(() => {
    huddleIframeApp.on(HuddleAppEvent.PEER_JOIN, (data) =>
      console.log({ iframeData: data })
    );
    huddleIframeApp.on(HuddleAppEvent.PEER_LEFT, (data) =>
      console.log({ iframeData: data })
    );
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div>
          <br />

          {Object.keys(huddleIframeApp.methods)
            .filter((key) => key !== "sendReaction")
            .map((key) => (
              <button
                onClick={() => {
                  huddleIframeApp.methods[key as HuddleClientMethodName]();
                }}
              >
                {key}
              </button>
            ))}
        </div>

        <HuddleIframe config={iframeConfig} />
        <br />
        {reactions.map((reaction) => (
          <button
            onClick={() => huddleIframeApp.methods.sendReaction(reaction)}
          >
            {reaction}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
