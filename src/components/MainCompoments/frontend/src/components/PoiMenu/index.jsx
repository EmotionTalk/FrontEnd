import React, { useState } from "react"; // useState import 추가
import * as S from "./styles";
import { toast } from 'react-toastify';

function PoiMenu({ isPoiOpen,onFilterApllied }) {
  const [errorMessage, setErrorMessage] = useState(""); // useState 사용
  const [companions,setCompanion]=useState("")

  const handleChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    const numericValue=parseInt(value,10);
    if (isNaN(numericValue) || numericValue < 0 || numericValue > 50) {
      setErrorMessage("0~50만 입력가능합니다.");
    } else {
      setErrorMessage("");
      setCompanion(numericValue);
    }
  };


  const applyFilter=async()=>{
    if(errorMessage){
      alert("입력값을 확인해주세요.")
      return;
    }
    try{
      const response=await fetch("http://localhost:8080/",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({companions:companions}),
      });

      if(!response.ok){
        throw new Error("Failed to apply filter.")
      }
      
      const result=await response.json();
      console.log("Filter apllied: ",result);
      onFilterApllied(result);
      toast.success("설정이 적용되었습니다.",{autoClose:1500})
    }
    catch(error){
      console.error("Error applying filter : ",error)
      toast.error("설정 적용에 실패했습니다.",{autoClose:1500})
    }
  }

  return (
    <S.PoiContainer className={`${isPoiOpen ? "open" : ""}`}>
      {/* POI 관련 정보를 여기에 표시 */}
      <S.PoiContent>
        <S.Title>
          탐색 옵션 설정
        </S.Title>
        <S.HelperText>동행자 수에 맞는 POI를 추천받으세요.</S.HelperText>
        <S.MemberContainer>
          <S.Member>동행자 수 :</S.Member>
          <S.MemberInput
            type="number"
            min="0"
            max="50"
            value={companions}
            onChange={handleChange}
          />
        </S.MemberContainer>
        {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
      </S.PoiContent>
      <S.ComplectButton onClick={applyFilter}>
        설정 적용
      </S.ComplectButton>
    </S.PoiContainer>
  );
}

export default PoiMenu;