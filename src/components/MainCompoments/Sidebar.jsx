import React from 'react';
import { ReactComponent as PerIcon } from "../../assets/per.svg";  // ReactComponent로 불러오기
import { ReactComponent as ChatIcon } from "../../assets/chat.svg";
import { ReactComponent as QIcon } from "../../assets/q.svg";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import Logo from "../../assets/ET로고1.png";
import "./style.css";
import { useCookieManager } from '../../customHook/useCookieManager';
import { useState } from 'react';
const Sidebar = ({ onChatClick, onMyClick }) => {

  const { removeCookies } = useCookieManager();
  const [activeTab, setActiveTab] = useState('my'); // 기본적으로 'my'를 선택
  const logout = () => {  
    removeCookies();
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab); // 클릭된 탭을 activeTab으로 설정
    if (tab === 'chat') onChatClick();
    if (tab === 'my') onMyClick();
  };
  return (
    <div className='sidebar'>
      <img src={Logo} alt="logo" className='logo-img' onClick={() => handleTabClick('my')} />
      <PerIcon 
        className={`sidebar-icon ${activeTab === 'my' ? 'active' : ''}`} 
        onClick={() => handleTabClick('my')}
      />
      <ChatIcon 
        className={`sidebar-icon ${activeTab === 'chat' ? 'active' : ''}`} 
        onClick={() => handleTabClick('chat')}
      />
      <QIcon 
        className={`sidebar-icon ${activeTab === 'q' ? 'active' : ''}`}
      />
      <BackIcon 
        className='sidebar-icon' 
        onClick={logout}
      />
    </div>
  );
};

export default Sidebar;
