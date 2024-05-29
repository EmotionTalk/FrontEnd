import React,{useState} from "react"
import "./style.css"
import LoginModal from "../../components/LoginModal"
import RecordModal from "../../components/RecordModal"
const First=()=>{
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [isRecordModalOpen,setIsRecordModalOpen]=useState(false);

    const handleStartBtn=()=>{
        setIsModalOpen(true);
    }

    const closeModal=()=>{
        setIsModalOpen(false);
    }

    const handleRecordBtn=()=>{
        setIsRecordModalOpen(true);
    }

    const closeRecordModal=()=>{
        setIsRecordModalOpen(false);
    }


    return(
        <div className="MainContainer">
            <div className="Start" onClick={handleStartBtn}>시작하기</div>
            <div className="RecordGo" onClick={handleRecordBtn}>RECORD</div>
            {isModalOpen && <LoginModal closeModal={closeModal}/>}
            {isRecordModalOpen && <RecordModal closeRecordModal={closeRecordModal}/>}   
        </div>
    )
}
export default First