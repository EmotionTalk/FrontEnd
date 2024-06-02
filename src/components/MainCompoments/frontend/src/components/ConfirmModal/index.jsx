import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as S from "./styles";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 모달이 생성된 후 애니메이션 효과를 위해 setTimeout을 사용합니다.
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(() => {
      onConfirm();
    }, 300); // 애니메이션이 끝나는 시간만큼 딜레이를 줍니다.
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      onCancel();
    }, 300);
  };

  return (
    <S.ModalBackdrop isVisible={isVisible}>
      <S.ModalContent>
        <p>{message}</p>
        <S.ModalButtons>
          <S.ConfirmButton onClick={handleConfirm}>확인</S.ConfirmButton>
          <S.CancelButton onClick={handleCancel}>취소</S.CancelButton>
        </S.ModalButtons>
      </S.ModalContent>
    </S.ModalBackdrop>
  );
};

ConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
