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
import ContextMenu from "../../components/MainCompoments/ContextMenu";  // 새로 생성한 ContextMenu 컴포넌트 가져오기
import "./style.css";

const Main = () => {
  const [view, setView] = useState('default');
  const [showChat, setShowChat] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [lastMessages, setLastMessages] = useState({});
  const [friendId, setFriendId] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);

  const { getCookies } = useCookieManager();

  useEffect(() => {
    const { accessToken, refreshToken } = getCookies();
    if (!accessToken || !refreshToken) {
      setShowLoginModal(true);
    }

    // Fetch my profile information
    if (accessToken) {
      fetch('http://localhost:8080/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        setMyProfile(data.resultData.profileUrl);
      })
      .catch(error => console.error('Error fetching my profile:', error));
    }
  }, [getCookies]);

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleUserChatClick = (userName, friendId, friendProfileImageUrl) => {
    setSelectedUser(userName);
    setSelectedUserProfile(friendProfileImageUrl);
    setShowChat(true);
    setFirstClick(false);
    setFriendId(friendId);
    setContextMenuPosition(null);  // ContextMenu 닫기
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

  const handleContextMenu = (event, friend) => {
    event.preventDefault();  // 기본 우클릭 메뉴 비활성화

    setSelectedUser(friend.nickname);
    setSelectedUserProfile(friend.friendProfileImageUrl);
    setFriendId(friend.friendMemberId);

    setContextMenuPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleDeleteFriend = () => {
    setLastMessages(prevMessages => {
      const updatedMessages = { ...prevMessages };
      delete updatedMessages[friendId];
      return updatedMessages;
    });
    // TODO: 서버와 연동하여 친구 삭제
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
                  userProfile={selectedUserProfile}
                  myProfile={myProfile}
                  onClose={handleChatClose}
                  friendId={friendId}
                  setLastMessages={setLastMessages}
                />
              )}
            </>
          )}
          {view === 'my' && (
            <>
              <My />
              <List onUserChatClick={handleUserChatClick} onContextMenu={handleContextMenu} />
              {!showChat && <Start />}
              {showChat && (
                <Chat 
                  userName={selectedUser}
                  userProfile={selectedUserProfile}
                  myProfile={myProfile}
                  onClose={handleChatClose}
                  friendId={friendId}
                  setLastMessages={setLastMessages}
                />
              )}
            </>
          )}
          {view === 'default' && (
            <>
              <My />
              <List onUserChatClick={handleUserChatClick} onContextMenu={handleContextMenu} />
              {!showChat && <Start />}
              {showChat && (
                <Chat 
                  userName={selectedUser}
                  userProfile={selectedUserProfile}
                  myProfile={myProfile}
                  onClose={handleChatClose}
                  friendId={friendId}
                  setLastMessages={setLastMessages}
                />
              )}
            </>
          )}
        </div>
      )}
      <ContextMenu 
        position={contextMenuPosition} 
        onClose={() => setContextMenuPosition(null)} 
        onOpenChat={() => handleUserChatClick(selectedUser, friendId, selectedUserProfile)}
        onDeleteFriend={handleDeleteFriend}
      />
    </div>
  );
};

export default Main;