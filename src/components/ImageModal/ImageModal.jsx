import React from 'react';
import './ImageModal.css'; // 스타일을 ImageModal.css로 변경합니다.

const ImageModal = ({ image, onClose }) => {
  return (
    <div className="image-modal" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="enlarged" className="enlargedImage" />
        <button className="close-button" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default ImageModal;
