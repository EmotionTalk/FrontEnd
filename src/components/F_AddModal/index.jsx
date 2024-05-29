import React, { useState } from 'react';
import F_Add from './F_Add';
import './style.css';

function index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="F-Modal">
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && <F_Add closeModal={closeModal} />}
    </div>
  );
}

export default index;
