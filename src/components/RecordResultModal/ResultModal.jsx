import React from 'react';
import './ResultModal.css';
import X from "../../assets/fx.svg";
import Angry from "../../assets/angry.svg"

const ResultModal = ({ show, onClose }) => {
  return (
    <div className={show ? 'modal-overlay' : 'hidden'} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={X} className='rx' onClick={onClose} />
        <div className="modal-header">
        <img src={Angry} className="emo" alt="Emotion" />
        </div>
        <div className="modal-body">
          <p>지금은 화난 상태에요.</p>
          <p>"먼저, 제가 오늘 회의에 말도 없이 참석하지 않은 점 정말 죄송합니다. 
            회의 참석이 중요한데 제가 그 점을 소홀히 한 것 같습니다. 
            무슨 이유에서든 미리 말씀드리지 못한 점 사과드리며, 
            앞으로는 이런 일이 발생하지 않도록 주의하겠습니다. 
            오늘 회의에서 논의된 내용이나 제가 놓친 부분에 대해 알려주시면 감사하겠습니다."
            라고 말씀해보세요. 상대방이 이해해주고 화가 사라지도록 솔직하고 죄송한 마음을 전해보세요.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
