import React, { useState } from "react";
import Sidebar from "../../components/MainCompoments/Sidebar";
import Chat from "../../components/MainCompoments/Chat";
import My from "../../components/MainCompoments/My";
import List from "../../components/MainCompoments/List";
import Start from "../../components/MainCompoments/Start";
import ChatList from "../../components/MainCompoments/ChatList";
import ChatStart from "../../components/MainCompoments/ChatStart";
import "./style.css";

const Main = () => {
  const [view, setView] = useState('default');
  const [showChat, setShowChat] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserChatClick = (user) => {
    setSelectedUser(user);
    setShowChat(true);
    setFirstClick(false);
  };

  const handleChatView = () => {
    setView('chat');
    setShowChat(false);
    setFirstClick(true);
  };

  const handleMyView = () => {
    setView('my');
    setShowChat(false);
    setFirstClick(true);
  };

  const handleChatClose = () => {
    setShowChat(false);
    setFirstClick(true);
  };

  return (
    <div className="Home">
      <div className="container">
        <Sidebar onChatClick={handleChatView} onMyClick={handleMyView} />
        {view === 'chat' && (
          <>
            <ChatList onUserChatClick={handleUserChatClick} />
            {firstClick && <ChatStart />}
            {!firstClick && showChat && <Chat user={selectedUser} onClose={handleChatClose} />}
          </>
        )}
        {view === 'my' && (
          <>
            <My />
            <List onUserChatClick={handleUserChatClick} />
            {!showChat && <Start />}
            {showChat && <Chat user={selectedUser} onClose={handleChatClose} />}
          </>
        )}
        {view === 'default' && (
          <>
            <My />
            <List onUserChatClick={handleUserChatClick} />
            {!showChat && <Start />}
            {showChat && <Chat user={selectedUser} onClose={handleChatClose} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
