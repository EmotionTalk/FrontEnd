import React, { useEffect, useState } from "react";
import { useCookieManager } from "../../customHook/useCookieManager";
import LoginModal from "../../components/LoginModal";
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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // 사용자 이름을 저장할 상태 변수
  const [lastMessages, setLastMessages] = useState({}); // 사용자별 마지막으로 보낸 메시지를 저장할 상태 변수
  const [friendId, setFriendId] = useState(null); // 채팅방 ID를 저장할 상태 변수

  const { getCookies } = useCookieManager();

  useEffect(() => {
    const { accessToken, refreshToken } = getCookies();
    if (!accessToken || !refreshToken) {
      setShowLoginModal(true);
    }
  }, [getCookies]);

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleUserChatClick = (userName, friendId) => {
    setSelectedUser(userName); // 클릭한 사용자 이름을 저장
    setShowChat(true);
    setFirstClick(false);
    setFriendId(friendId); // 클릭한 채팅방 ID를 저장
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
      {showLoginModal && <LoginModal closeModal={handleCloseModal} />}
      {!showLoginModal && (
        <div className="container">
          <Sidebar onChatClick={handleChatView} onMyClick={handleMyView} />
          {view === 'chat' && (
            <>
              <ChatList 
                onUserChatClick={handleUserChatClick} 
                lastMessages={lastMessages} 
              />
              {firstClick && <ChatStart />}
              {!firstClick && showChat && (
                <Chat
                  userName={selectedUser}
                  onClose={handleChatClose}
                  friendId={friendId} // 채팅방 ID 전달
                  setLastMessages={setLastMessages} // 마지막 메시지 설정 함수 전달
                />
              )}
            </>
          )}
          {view === 'my' && (
            <>
              <My />
              <List onUserChatClick={handleUserChatClick} />
              {!showChat && <Start />}
              {showChat && (
                <Chat 
                  userName={selectedUser}
                  onClose={handleChatClose}
                  friendId={friendId} // 채팅방 ID 전달
                  setLastMessages={setLastMessages} // 마지막 메시지 설정 함수 전달
                />
              )}
            </>
          )}
          {view === 'default' && (
            <>
              <My />
              <List onUserChatClick={handleUserChatClick} />
              {!showChat && <Start />}
              {showChat && (
                <Chat 
                  userName={selectedUser}
                  onClose={handleChatClose}
                  friendId={friendId} // 채팅방 ID 전달
                  setLastMessages={setLastMessages} // 마지막 메시지 설정 함수 전달
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
