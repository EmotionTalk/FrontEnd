import React, { useState } from 'react';
import './Modal.css';

const F_Add = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');

  const handleAddFriend = () => {
    console.log('Name:', name);
    console.log('Phone:', `${phone1}-${phone2}-${phone3}`);
    // Add your friend adding logic here
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span>친구 추가</span>
          <button className="close-button" onClick={closeModal}>X</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="phone-inputs">
            <input
              type="text"
              placeholder="010"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
            />
            <input
              type="text"
              placeholder="1234"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
            <input
              type="text"
              placeholder="5678"
              value={phone3}
              onChange={(e) => setPhone3(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleAddFriend}>친구 추가</button>
        </div>
      </div>
    </div>
  );
};

export default F_Add;
