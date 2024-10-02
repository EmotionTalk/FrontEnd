import React from 'react';
import './LoadingModal.css';  // CSS 파일

const LoadingModal = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-pulse"></div>
    </div>
  );
};

export default LoadingModal;
