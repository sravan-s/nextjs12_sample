import dynamic from "next/dynamic";

import { useState } from "react";
import "@sendbird/uikit-react/dist/index.css";

const SendbirdProvider  = dynamic(import("@sendbird/uikit-react/SendbirdProvider"), {
  ssr: false,
});
const ChannelList  = dynamic(import("@sendbird/uikit-react/ChannelList"), {
  ssr: false,
});
const Channel = dynamic(import("@sendbird/uikit-react/Channel"), {
  ssr: false,
});
const ChannelSettings = dynamic(import("@sendbird/uikit-react/ChannelSettings"), {
  ssr: false,
});
// const ChannelListProvider  = dynamic(import("@sendbird/uikit-react/ChannelList/context").then(module => module.ChannelListProvider), {
//   ssr: false,
// });
//  import { useChannelList } from '@sendbird/uikit-react/ChannelList/context';


const Chat = () => {
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  return (
    <SendbirdProvider
      appId=""
      userId="sendbird"
      nickname="sendbird"
    >
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <ChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <Channel
            onChatHeaderActionClick={() => {
              if (showSettings) {
                setShowSettings(false);
              } else {
                setShowSettings(true);
              }
            }}
            channelUrl={currentChannelUrl}
          />
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <ChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>
    </SendbirdProvider>
  );
};

export default Chat;
