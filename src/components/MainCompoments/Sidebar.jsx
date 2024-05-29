import React from 'react';
import Per from "../../assets/per.svg";
import Chat from "../../assets/chat.svg";
import Q from "../../assets/q.svg";
import Back from "../../assets/back.svg";
import Logo from "../../assets/ET로고1.png";
import "./style.css";

const Sidebar = ({ onChatClick, onMyClick }) => {
  return (
    <div className='sidebar'>
      <img src={Logo} alt="" className='logo-img' />
      <img src={Per} alt="" onClick={onMyClick} />
      <img src={Chat} alt="" onClick={onChatClick} />
      <img src={Q} alt="" />
      <img src={Back} alt="" />
    </div>
  );
};

export default Sidebar;
