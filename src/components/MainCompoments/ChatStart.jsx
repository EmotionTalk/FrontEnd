import React from 'react'
import ChatIcon from "../../assets/채팅.svg"

const ChatStart = () => {
  return (
    <div className='chatstart'>
      <div className="c-s">
        <img src={ChatIcon} className='ic' />
        <h1>채팅 할 상대를 선택 해주세요!</h1>
      </div>
    </div>
  )
}

export default ChatStart
