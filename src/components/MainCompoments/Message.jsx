import React, { forwardRef, useState } from 'react';
import "./style.css";
import DefaultProfile from "../../assets/pro.jpg";
import PlayIcon from "../../assets/play_icon.png"
import PauseIcon from "../../assets/pause_icon.png"

const Message = forwardRef(({ message, sendTime, image, sender, profileImage, userName, onClick, onImageClick, messageType,audioUrl }, ref) => {
  
  const [isPlaying,setIsPlaying]=useState(false);
  const audioRef=React.createRef();
  
  const handleMessageClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleAudioToggle=()=>{
    if(isPlaying){
      audioRef.current.pause();
      setIsPlaying(false);
    }else{
      audioRef.current.play();
      setIsPlaying(true);
    }
  }


  return (
    <div className={`message ${sender === 'me' ? 'owner' : ''} ${messageType === 'TRANSCRIPT' ? 'transcript-message' : ''}`} ref={ref}>
      <div className="messageInfo">
        <img src={profileImage || DefaultProfile} alt="profile" />
        <span>{userName}</span>
      </div>
      <div className="messageContent">
      {messageType === 'TRANSCRIPT' && audioUrl ? (
          <div className="transcript-content">
            <button className="audio-toggle-btn" onClick={handleAudioToggle}>
              <img src={isPlaying ? PauseIcon : PlayIcon} alt="play/pause" className="audio-control-icon" />
            </button>
            <p onClick={handleMessageClick}>{message}</p>
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} style={{ display: 'none' }} />
          </div>
        ) : image ? (
          <img src={image} alt="sent" className="messageImage" onClick={onImageClick} />
        ) : (
          <p onClick={handleMessageClick}>{message}</p>
        )}
        {/* {image ? (
          <img
            src={image}
            alt="sent"
            className="messageImage"
            onClick={onImageClick} // 이미지 클릭 핸들러 추가
          />
        ) : (
          <p onClick={handleMessageClick}>{message}</p>
        )} */}
        <span className="messageTime">{sendTime}</span>
      </div>
    </div>
  );
});

export default Message;
