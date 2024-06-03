// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Search from './Search';
// import Profile from "../../assets/pro.jpg";
// import Modal from '../F_AddModal/F_Add';
// import "./style.css";
// import FA from "../../assets/친구추가.svg";

// const List = ({ onUserChatClick }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // 백엔드에서 사용자 데이터를 가져오는 함수
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('/api/users'); // 백엔드 엔드포인트 URL에 맞게 수정
//         setUsers(response.data);
//       } catch (error) {
//         console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleUserChatClick = (userId) => {
//     onUserChatClick(userId); // userId를 부모 컴포넌트에 전달
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className='list'>
//       <div className='navbar'>
//         <span className='f-list'>친구 목록</span>
//         <img src={FA} className='f-a' onClick={openModal} alt="친구추가" />
//       </div>
//       <Search />
//       <div className='chats'>
//         {users.map(user => (
//           <div key={user.id} className="users" onClick={() => handleUserChatClick(user.id)}>
//             <img src={user.profileImage || Profile} alt="Profile" />
//             <div className="userChatInfo">
//               <span>{user.name}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <Modal isOpen={isModalOpen} onClose={closeModal} />
//     </div>
//   );
// };

// export default List;

//임시
import React, { useState } from 'react';
import Search from './Search';
import Profile from "../../assets/pro.jpg";
import Modal from '../F_AddModal/F_Add'; // 경로를 정확히 설정하세요.
import "./style.css";
import FA from "../../assets/친구추가.svg";

const List = ({ onUserChatClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserChatClick = () => {
    onUserChatClick(); // 클릭 시 onUserChatClick 함수 호출
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='list'>
      <div className='navbar'>
        <span className='f-list'>친구 목록</span>
        <img src={FA} className='f-a' onClick={openModal} alt="친구추가" />
      </div>
      <Search />
      <div className='chats'>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile" />
          <div className="userChatInfo">
            <span>권건표</span>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile" />
          <div className="userChatInfo">
            <span>남주영</span>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile" />
          <div className="userChatInfo">
            <span>이유진</span>
          </div>
        </div>
        <div className="users" onClick={handleUserChatClick}>
          <img src={Profile} alt="Profile" />
          <div className="userChatInfo">
            <span>홍윤기</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
export default List;