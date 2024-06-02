import styled from "styled-components";
import { Link } from "react-router-dom";


export const Container = styled.div`
    position: fixed;
    top: 0;
    left: -200px;
    width: 200px;
    height: 100vh;
    border-radius: 0px 12px 12px 0px;
    background-color: #fff;
    transition: all 0.5s ease;
    z-index: 7;
    &.open {
        left: 76px;
    }
`;

export const UserContainer = styled.div`
    position: absolute;
    top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 50px;
`;

export const UserImage = styled.img`
    width: 100px;
    height: 100px;
`;

export const GoLogin = styled(Link)`
    text-align: center;
    margin-top: 210px;
    margin-bottom: 20px;
    display: block;
    text-decoration: none;
    cursor: pointer;
    color: black;
`;
export const HoverBox=styled.div`
    padding:12px 0;
    &:hover{
        background-color: rgba(0, 0, 0, 0.1);
    }

`

export const Text2 = styled.div`
    /* text-align: center;
    margin-top: 20px;
    color: black; */
    text-align: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
    display: block;

`;

export const CloseBtn = styled.img`
    position:absolute;
    width:25px;
    top: 15px;
    right:10px;
`;
export const LogOutContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;
`;
export const LogOutIcon = styled.img`
    width: 30px;
    margin-right: 5px;
`;
export const LogOutText = styled.div`
    color: black;
    font-size: 14px;

`;
