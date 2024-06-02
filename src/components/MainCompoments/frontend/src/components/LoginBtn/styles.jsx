import styled from "styled-components";

export const Button = styled.button`
    background-color: #fff;

    border-radius: 10px;
    width: 100%;
    padding: 15px 20px;
    margin-top: 20px;
    cursor: pointer;
    transition: filter 0.3s ease;
    &:hover {
        filter: brightness(0.8) !important; 
    }
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const Wrapper = styled.div`
    padding: 0 40px;
    align-items: center; 
    display: flex;
    justify-content: center;
`;

export const LogoImage = styled.img`
    width: 25px;
    display: block;
    margin-top: 1px;
    height: 25px;
`;

export const LoginText = styled.span`
    margin-left: 20px;
    font-size: 18px;
    font-weight: bold;
    display: block;
    width: 150px;
    text-align: left;
    color: black;
    `;