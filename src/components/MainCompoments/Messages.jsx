import React, { useEffect, useRef } from 'react';
import Message from "./Message";
import "./style.css";

const Messages = ({ messages }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className='messages'>
      {messages.map((msg, index) => (
        <Message
          key={index}
          text={msg.text}
          time={msg.time}
          image={msg.image} // 이미지 prop 추가
          ref={index === messages.length - 1 ? lastMessageRef : null} // 마지막 메시지에 ref를 추가
        />
      ))}
      <div ref={lastMessageRef} /> {/* 마지막 메시지를 가리키는 ref */}
    </div>
  );
};

export default Messages;
