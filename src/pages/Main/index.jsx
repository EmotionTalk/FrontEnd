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
import ContextMenu from "../../components/MainCompoments/ContextMenu";
import "./style.css";
import useWindowDimensions from '../../customHook/useWindowDimensions';
import MobileFriendList from "../../components/MainCompoments/MobileFriendList";

const Main = () => {
  const [view, setView] = useState('default');
  const [showChat, setShowChat] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [myNickName, setMyNickName] = useState('로그인을 해주세요!');
  const [lastMessages, setLastMessages] = useState({});
  const [friendId, setFriendId] = useState(null);
  const [friendsList, setFriendsList] = useState([]); // 친구 목록을 빈 배열로 초기화
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const { height, width } = useWindowDimensions();

  const { getCookies, removeCookies } = useCookieManager();

  // 친구 목록을 불러오는 함수
  const fetchFriends = async () => {
    const localAccessToken = getCookies().accessToken;
    if (localAccessToken) {
      try {
        const response = await fetch('http://localhost:8080/friend/getFriends', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localAccessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('친구 목록 가져오기:', data.resultData);
        setFriendsList(data.resultData || []); // 친구 목록 설정, 없으면 빈 배열
      } catch (error) {
        console.error('친구 목록 불러오기 오류:', error);
        setFriendsList([]); // 오류 발생 시 빈 배열로 설정
      }
    }
  };

  useEffect(() => {
    console.log('FriendsList State:', friendsList); // 친구 목록이 업데이트될 때마다 콘솔 출력
    const { accessToken, refreshToken } = getCookies();
    if (!accessToken || !refreshToken) {
      setShowLoginModal(false);
      return;
    }
    
    // 내 프로필 정보 가져오기
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
        setMyNickName(data.resultData.name);
        setMyProfile(data.resultData.profileUrl);
        fetchFriends(); // 친구 목록도 함께 가져옴
      })
      .catch(e => {
        removeCookies(); // 오류 시 쿠키 제거 및 로그아웃 처리
      });
    }
  }, [getCookies().accessToken]); // 의존성 배열을 빈 배열로 설정해서 최초 로딩 시만 실행

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
  
    if (event.type !== "contextmenu") {
      return;
    }
  
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
  };

  return (
    <div className="Home">
      {showLoginModal && <LoginModal closeModal={handleCloseModal} />}
      {!showLoginModal && (
        <div className="container">
          <Sidebar onChatClick={handleChatView} onMyClick={handleMyView} />
          
          {width >= 850 ? (
            // 850 이상일 때 렌더링되는 컴포넌트
            <>
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
                  <My 
                    userNickName={myNickName} 
                    userProfileUrl={myProfile} 
                  />
                  <List 
                    onUserChatClick={handleUserChatClick} 
                    onContextMenu={handleContextMenu} 
                    friendsList={friendsList} 
                  />
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
                  <My 
                    userNickName={myNickName} 
                    userProfileUrl={myProfile} 
                  />
                  <List 
                    onUserChatClick={handleUserChatClick} 
                    onContextMenu={handleContextMenu} 
                    friendsList={friendsList} 
                  />
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
            </>
          ) : (
            // 850 미만일 때 MobileFriendList 컴포넌트 렌더링
            <>
            {!showChat && (
              <MobileFriendList
              userNickName={myNickName} 
              userProfileUrl={myProfile} 
              friendsList={friendsList} 
              onUserChatClick={handleUserChatClick}
              />
            )}
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