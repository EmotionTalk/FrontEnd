import styled, { css } from "styled-components";

const focusStyles = css`
background-color: #f0efef; 
box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.8);
transition: background-color 0.5s ease, box-shadow 0.5s ease;
`;


export const MapContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: visible;
`;

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 7; 
`;

export const MemberToggleBtnBox = styled.div`
    position: absolute;
    width: fit-content;
    height: fit-content;
    bottom: 43px;
    background-color: #fff;
    transition: right 0.5s ease;
    flex-direction: column;
    border-radius: 50px;
    display:flex;
`;

export const MenuToggleBtn = styled.button`
    background-color: transparent;
    padding:0px;
`;

export const MenuImage = styled.img`
    width: 30px;
    display: block;
    margin-top: 1px;
    height: 30px;
`;

export const CurrentLocationBtn = styled.button`
    position: absolute;
    bottom: 20px;
    right: 44px;
    z-index: 5;
    width: 45px;
    height: 45px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 50px ;
    transition: right 0.5s ease;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4); 
    &:hover {
        ${focusStyles}
    }
`;

export const CurrentLocationImg = styled.img`
    width: 100%;
    height: 100%;
    transition: right 0.5s ease;
`;

export const TapContainer = styled.div`
    position: absolute;
    width: 76px;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    z-index: 7; 
    border-right: 1px solid #ced4da;
`

export const LogoContainer=styled.div`
    border: 1px solid #ced4da;
    padding:44px 18px;
`

export const PoiToggleBtnBox = styled.div`
    position: absolute;
    width : 76px;
    height: 76px;
    top: 132px;
    flex-direction: column;
    display:flex;
    cursor: pointer;
    border: 0 1px solid #ced4da;
    &:hover{
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const PoiToggleBtn = styled.button`
    background-color: transparent;
    padding-top: 13px;
`;

export const PoiImage = styled.img`
    width: 30px;
    height:32px;
    display: block;
    margin:0 auto;
`;

export const PoiText = styled.div`
    font-size: 13px;
    margin-top: 3px;
    text-align: center;
`

export const CourseToggleBtnBox=styled.div`
    position: absolute;
    width : 76px;
    height: 76px;
    top: 208px;
    flex-direction: column;
    display:flex;
    cursor: pointer;
    border: 1px solid #ced4da;
    &:hover{
        background-color: rgba(0, 0, 0, 0.1);
    }
`

export const CourseToggleBtn=styled.button`
    background-color: transparent;
    padding-top: 12px;
`

export const CourseImage = styled.img`
    width: 30px;
    height:32px;
    display: block;
    margin:0 auto;
`;

export const CourseText = styled.div`
    font-size: 13px;
    margin-top: 3px;
`