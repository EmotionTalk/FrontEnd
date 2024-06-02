import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #e7deb5;
`;
export const ErrorMessage = styled.h1`
    font-size: 40px;
    color: #d56810;
    text-align: center;
    display: block;
    text-align: center;
`;

export const ErrorCode = styled.h1`
    font-family: 'TTLaundryGothicB';
    display: block;
    margin:0;
    font-size: 140px;
    color: #4c95b9;
    text-align: center;
`;


export const Image = styled.img`
    width: 400px;
    margin-bottom: 20px;
`;  

export const GoMainPage = styled.button`
    font-size: 20px;
    margin-top: 20px;
    color: #dc7520;
    border-radius: 50px;
    padding: 10px 20px;
    background-color: #eeba6b;
    &:hover {
        filter: brightness(0.8);
    }
`;