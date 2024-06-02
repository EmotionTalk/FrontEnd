import styled, { keyframes }  from "styled-components";
import { Link } from "react-router-dom";

const fadeIn=keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`
const moveFromLeft=keyframes`
    from{
        transform: translateX(-32%);
        opacity: 0.4;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`;
const moveFromRight=keyframes`
    from{
        transform: translateX(32%);
        opacity: 0.4;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`

export const PageContainer = styled.div`
    max-width: 500px;
    margin: 0 auto;
    width: 100%; // 추가된 부분

    @media (max-width: 390px) {
        width: 100%; 
        padding: 0 10px;
    }
    animation: ${fadeIn} 3s forwards;
`;

export const TopContainer = styled.div`
    text-align: center;
    margin-bottom: 0;
`;

export const TopDescription = styled.div`
    text-align: left;
    color: var(--primary-color);
    /* color: transparent;
    background: linear-gradient(to right,#052c65,#92c5fe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
`
export const Welcome = styled.h1`
    font-size: 23px;
    font-weight: 500;
    margin-top:20px;
    margin-bottom: 5px;
    text-align: center;
    font-weight: bold;
    /* font-size: 24px;
    color: #0056b3;
    margin-bottom: 10px; */
`
export const SoloLetterLogo=styled.img`
    height: 48px;
`
export const Underline = styled.div`
    /* background-color: var(--primary-color); */
    background-image: linear-gradient(to right, var(--sub-color2),#92c5fe);
    height: 4px;
    width: 100%;
    margin:20px 0;
`
// export const Text = styled.p`
//     margin-top: 5px;
//     font-weight: bold;
//     font-size: 30px;
//     word-spacing: 2px;
//     line-height: 40px;
//     /* color: #666;
//     font-size: 16px; */
// `


export const Text1=styled.p`
    margin: 5px 0 0 0;
    font-weight: bold;
    font-size: 28px;
    word-spacing: 2px;
    animation: ${moveFromLeft} 1.5s ease-in-out;
    text-align: center;
`

export const Text2=styled.p`
    margin-top: 0px;
    font-weight: bold;
    font-size: 28px;
    word-spacing: 2px;
    text-align: center;
    animation: ${moveFromRight} 1.5s ease-in-out;
`

export const MainLogo = styled.svg`
    /* width: 200px; */
    width: 160px;
    /* margin-bottom: 20px; */
`

export const Wrapper = styled.div`
    padding: 0 60px;
    @media (max-width: 390px) {
        padding: 0 20px; // 수정된 부분
    }
`;

export const TopHeader = styled.div`
    margin-top: 80px;
    margin-bottom: 12px;
`;

export const LoginBtnList = styled.div`
    
`;

export const BottomContainer = styled.div`
    text-align: center;
    margin-top: 100px;
`;

export const NoLoginLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:hover {
        text-decoration: underline;
        font-weight: bold;
    }
`;

export const NoLoginContainer = styled.div`
    padding:20px;
    text-align: center;
    margin-top: 8px;
`;