// import React from 'react';
// import Search from './Search';
// import Profile from "../../assets/pro.jpg";
// import "./style.css";
// import CA from '../../assets/채팅추가.svg'

// const ChatList = ({ onUserChatClick }) => {
//   const handleChatClick = () => {
//     if (onUserChatClick) {
//       onUserChatClick(); // onUserChatClick 함수를 호출하여 클릭 이벤트를 전달합니다.
//     }
//   };
    
//   return (
//     <div className='chatlist'>
//       <div className='navbar'>
//         <span className='c-list'>채팅 목록</span>
//         <img src={CA} className='c-a' />
//       </div>
//       <Search />
//       <div className='chats'>
//         {/* 사용자 채팅 요소 */}
//         <div className="userChat" onClick={handleChatClick}>
//           <img src={Profile} className='ipro'/>
//           <div className="userChatInfo">
//           {/* 채팅 상대 */}
//             <span>권건표</span> 
//             {/* 마지막으로 보낸 */}
//             <p>오늘 왜 회의 말도 없이 안 오셨죠?</p>
//           </div>
//         </div>
//           </div>
//     </div>
//   );
// };

// export default ChatList;

//임시
import React from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import "./style.css";
import CA from '../../assets/채팅추가.svg';

const ChatList = ({ onUserChatClick, lastMessages }) => {
  const handleChatClick = (userName) => {
    if (onUserChatClick) {
      onUserChatClick(userName); // 클릭한 사용자의 이름을 부모 컴포넌트로 전달
    }
  };
    
  return (
    <div className='chatlist'>
      <div className='navbar'>
        <span className='c-list'>채팅 목록</span>
        <img src={CA} className='c-a' alt="채팅 추가" />
      </div>
      <Search />
      <div className='chats'>
        {/* 사용자 채팅 요소 */}
        <div className="userChat" onClick={() => handleChatClick("권건표")}>
          <img src={Profile} className='ipro' alt="프로필 이미지" />
          <div className="userChatInfo">
            {/* 채팅 상대 */}
            <span>권건표</span> 
            {/* 마지막으로 보낸 메시지 */}
            <p>{lastMessages["권건표"]}</p>
          </div>
        </div>
        {/* 사용자 채팅 요소 */}
        <div className="userChat" onClick={() => handleChatClick("홍윤기")}>
          <img src={Profile} className='ipro' alt="프로필 이미지" />
          <div className="userChatInfo">
            {/* 채팅 상대 */}
            <span>홍윤기</span> 
            {/* 마지막으로 보낸 메시지 */}
            <p>{lastMessages["홍윤기"]}</p>
          </div>
        </div>
        {/* 사용자 채팅 요소 */}
        <div className="userChat" onClick={() => handleChatClick("이유진")}>
          <img src={Profile} className='ipro' alt="프로필 이미지" />
          <div className="userChatInfo">
            {/* 채팅 상대 */}
            <span>이유진</span> 
            {/* 마지막으로 보낸 메시지 */}
            <p>{lastMessages["이유진"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;

