import React from 'react';
import Per from "../../assets/per.svg";
import Chat from "../../assets/chat.svg";
import Q from "../../assets/q.svg";
import Back from "../../assets/back.svg";
import Logo from "../../assets/ET로고1.png";
import "./style.css";
import { useCookieManager } from '../../customHook/useCookieManager';

const Sidebar = ({ onChatClick, onMyClick }) => {
  const { removeCookies } = useCookieManager();
  const logout = () => {  
    removeCookies();
  }
  return (
    <div className='sidebar'>
      <img src={Logo} alt="" className='logo-img' onClick={onMyClick} />
      <img src={Per} alt="" onClick={onMyClick} />
      <img src={Chat} alt="" onClick={onChatClick} />
      <img src={Q} alt="" />
      <img src={Back} alt="" onClick={logout} />
    </div>
  );
};

export default Sidebar;
