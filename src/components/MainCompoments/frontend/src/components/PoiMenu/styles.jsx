import styled from "styled-components";

export const PoiContainer = styled.div`
  position: fixed;
  top: 0;
  left: -300px;
  width: 250px;
  height: 100vh;
  margin-left: 78px;
  border-radius: 0px 12px 12px 0px;
  background-color: #fff;
  transition: left 0.5s ease;
  z-index: 4;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  &.open {
    left: 0;
  }
`;

export const CloseBtn = styled.img`
  position: absolute;
  width: 20px;
  top: 25px;
  right: 20px;
  cursor: pointer;
`;

export const PoiContent = styled.div`
  padding: 20px 20px 0 20px;
`;
export const Title = styled.div`
    margin-left: 16px;
    margin-bottom: 20px;
    margin-top: 50px;
    color: #333;
    font-weight: normal;
    font-size: 32px;
`
export const HelperText=styled.div`
    color: #6c757d;
    font-size: 12px;
    text-align: center;
`
export const MemberContainer = styled.div`
  margin-top:40px;
  display: flex;
  align-items: center; // 자식 요소들을 세로 중앙에 정렬
`
export const Member = styled.div`
  color: #333;
  font-weight: normal;
  margin-left: 28px;
  font-size: 17px;
  margin-top: -17px;
`;

export const MemberInput = styled.input`
    width: 36px;
    padding: 4px;
    margin-left:15px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right:20px;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 
    }
`;


export const ErrorMessage = styled.div`
    font-weight: normal;
    color: red;
    font-size: 0.7rem;
    margin-left: 40px;
    position: absolute;
`

export const ComplectButton = styled.button`
    width: 120px;
    padding: 10px;
    border: none;
    margin: 36px 64px;
    border-radius: 30px;
    background-color:  var(--primary-color);
    color: white;
    cursor: pointer;
    transition: filter 0.3s ease;
    display:block;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
`