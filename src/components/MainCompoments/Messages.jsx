import React, { useEffect, useRef, useState } from 'react';
import Message from "./Message";
import ResultModal from "../RecordResultModal/ResultModal";
import "./style.css";

const Messages = ({ messages, userId }) => { // userId 추가
  const lastMessageRef = useRef(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleLastMessageClick = () => {
    setShowResultModal(true);
  };

  return (
    <div className='messages'>
      {messages.map((msg, index) => (
        <Message
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          message={msg.messageType === 'IMAGE' ? null : msg.message}
          sendTime={msg.sendTime}
          image={msg.messageType === 'IMAGE' ? msg.filePath : null}
          sender={msg.senderId === userId ? 'me' : 'other'} // userId를 이용해 소유자 구분
          onClick={index === messages.length - 1 ? handleLastMessageClick : null}
        />
      ))}
      <ResultModal show={showResultModal} onClose={() => setShowResultModal(false)} />
    </div>
  );
};

export default Messages;
