import React from 'react';
import Profile from "../../assets/profile.png";
import 편집 from "../../assets/편집.svg";
import 나와 from "../../assets/나와.svg";

const My = ({ userNickName, userProfileUrl }) => {
  return (
    <div className='my'>
      <div className='navbar'>
        <span className='mynav'>내 정보</span>
      </div>
      <div className="my-profile">
        <img src={!userProfileUrl ? Profile : userProfileUrl} alt="profile" />
        <span>{userNickName}</span>
      </div>

      <div className="mee">
        <div className="me">
          <img src={나와} alt="나와 채팅" />
          <span>나와 채팅</span>
        </div>

        <div className="tnwjd">
          <img src={편집} alt="프로필 편집" />
          <span>프로필 편집</span>
        </div>
      </div>
    </div>
  );
};

export default My;