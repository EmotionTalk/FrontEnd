import React from 'react';
import './ContextMenu.css';

const ContextMenu = ({ position, onClose, onOpenChat, onDeleteFriend }) => {
  if (!position) return null;

  return (
    <div
      className="context-menu"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <button 
        onClick={() => {
          onOpenChat();
          onClose();
        }}
      >
        채팅방 열기
      </button>
      <button 
        onClick={() => {
          onDeleteFriend();
          onClose();
        }}
      >
        친구 삭제
      </button>
    </div>
  );
};

export default ContextMenu;