import React, {useEffect} from 'react';
import * as S from './styles';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // ESC 키를 눌렀을 때 모달을 닫습니다.
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    // 모달이 열릴 때 ESC 키 이벤트를 추가합니다.
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // 모달이 열려있지 않다면 null을 반환하여 아무것도 렌더링하지 않습니다.
  if (!isOpen) return null;

  return (
    <S.ModalContainer onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default Modal;
