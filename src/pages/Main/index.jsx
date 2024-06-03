// import React, { useEffect, useState } from "react";
// import { useCookieManager } from "../../customHook/useCookieManager";
// import LoginModal from "../../components/LoginModal";
// import Sidebar from "../../components/MainCompoments/Sidebar";
// import Chat from "../../components/MainCompoments/Chat";
// import My from "../../components/MainCompoments/My";
// import List from "../../components/MainCompoments/List";
// import Start from "../../components/MainCompoments/Start";
// import ChatList from "../../components/MainCompoments/ChatList";
// import ChatStart from "../../components/MainCompoments/ChatStart";
// import "./style.css";

// const Main = () => {
//   const [view, setView] = useState('default');
//   const [showChat, setShowChat] = useState(false);
//   const [firstClick, setFirstClick] = useState(true);
//   const [showLoginModal, setShowLoginModal]=useState(false);

//   const {getCookies}=useCookieManager();

//   useEffect(()=>{
//     const {accessToken,refreshToken}=getCookies();
//     if(!accessToken || !refreshToken){
//       setShowLoginModal(true);
//     }
//   },[getCookies])

//   const handleCloseModal = () => {
//     setShowLoginModal(false);
//   };


//   const handleUserChatClick = () => {
//     setShowChat(true);
//     setFirstClick(false);
//   };

//   const handleChatView = () => {
//     setView('chat');
//     setShowChat(false);
//     setFirstClick(true);
//   };

//   const handleMyView = () => {
//     setView('my');
//     setShowChat(false);
//     setFirstClick(true);
//   };

//   const handleChatClose = () => {
//     setShowChat(false);
//     setFirstClick(true);
//   };

//   return (
//     <div className="Home">
//       {showLoginModal && <LoginModal closeModal={handleCloseModal}/>}
//       {!showLoginModal && (
//       <div className="container">
//         <Sidebar onChatClick={handleChatView} onMyClick={handleMyView} />
//         {view === 'chat' && (
//           <>
//             <ChatList onUserChatClick={handleUserChatClick} />
//             {firstClick && <ChatStart />}
//             {!firstClick && showChat && <Chat onClose={handleChatClose} />}
//           </>
//         )}
//         {view === 'my' && (
//           <>
//             <My />
//             <List onUserChatClick={handleUserChatClick} />
//             {!showChat && <Start />}
//             {showChat && <Chat onClose={handleChatClose} />}
//           </>
//         )}
//         {view === 'default' && (
//           <>
//             <My />
//             <List onUserChatClick={handleUserChatClick} />
//             {!showChat && <Start />}
//             {showChat && <Chat onClose={handleChatClose} />}
//           </>
//         )}
//       </div>
//       )}
//     </div>
//   );
// };

// export default Main;

//임시
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
  const [messages, setMessages] = useState({}); // 사용자별 메시지를 저장할 상태 변수
  const [lastMessages, setLastMessages] = useState({}); // 사용자별 마지막으로 보낸 메시지를 저장할 상태 변수

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

  const handleUserChatClick = (userName) => {
    setSelectedUser(userName); // 클릭한 사용자 이름을 저장
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

  const handleSendMessage = (userName, message) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [userName]: [...(prevMessages[userName] || []), message]
    }));
    setLastMessages(prevLastMessages => ({
      ...prevLastMessages,
      [userName]: message.text
    }));
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
                  messages={messages[selectedUser] || []}
                  onSendMessage={handleSendMessage}
                  onClose={handleChatClose} 
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
                  messages={messages[selectedUser] || []}
                  onSendMessage={handleSendMessage}
                  onClose={handleChatClose} 
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
                  messages={messages[selectedUser] || []}
                  onSendMessage={handleSendMessage}
                  onClose={handleChatClose} 
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


