import React, { useState, useRef, useEffect } from 'react';
import Profile from "../../../assets/profile.png";
import AddFriendIcon from "../../../assets/친구추가.svg"; // 친구 추가 아이콘
import SearchIcon from '../../../assets/search_icon.svg';
import ClearIcon from '../../../assets/x.svg'; // Clear (X) 아이콘
import "./styles.css"; // 스타일 파일을 별도로 생성하여 적용
import Modal from '../../F_AddModal/F_Add';

const MobileFriendList = ({ userNickName, userProfileUrl, onUserChatClick, friendsList }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 상태
  const [searchText, setSearchText] = useState(""); // 검색창 입력 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const inputRef = useRef(null); // input 요소 참조
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // 검색창 열기/닫기 토글
    setSearchText("");
  };

  // 검색창이 열릴 때 input에 포커스를 설정
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const clearSearch = () => {
    setSearchText(""); // 검색창 입력 내용 지우기
  };

  // 검색어에 맞는 친구들만 필터링
  const filteredFriends = friendsList.filter((friend) =>
    friend.nickname.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="mobile-container">
      {/* 상단 검색 및 친구추가 버튼 */}
      <div className="mobile-header">
        <span>친구</span>
        <div>
          <img
            src={SearchIcon}
            alt="검색 아이콘"
            className="icon search-icon"
            onClick={toggleSearch}
          />
          <img src={AddFriendIcon} onClick={openModal} alt="친구 추가" className="icon" />
        </div>
      </div>

      {/* 검색창 (애니메이션 포함) */}
      <div className={`search-bar-wrapper ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-bar">
          <input
            ref={inputRef} // input 요소에 ref 추가
            type="text"
            placeholder="검색"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} // 검색 입력 업데이트
          />
          <img
            src={ClearIcon}
            alt="입력 내용 지우기"
            className={`clear-icon ${searchText ? 'show' : ''}`} // 동적으로 클래스 추가/제거
            onClick={clearSearch}
          />
        </div>
      </div>

      {/* 내 프로필 섹션 */}
      <div className="mobile-profile">
        <img src={userProfileUrl || Profile} alt="프로필" className="profile-image" />
        <span className="profile-name">{userNickName || '로그인 해주세요'}</span>
      </div>

      {/* 친구 목록 라벨 */}
      <div className="friend-label">
        친구 {filteredFriends.length}
      </div>

      {/* 친구 목록 */}
      <div className="friends-list">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
            <div key={index} className="friend-item"
               onClick={() => onUserChatClick(friend.nickname, friend.friendMemberId, friend.friendProfileImageUrl)}>
              <img src={friend.friendProfileImageUrl || Profile} alt={friend.nickname} className="friend-profile-image" />
              <span className="friend-name">{friend.nickname}</span>
            </div>
          ))
        ) : (
          <div className="no-friends">친구가 없습니다.</div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default MobileFriendList;