import styled from "styled-components";

export const SignCompleteContainer = styled.div`    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
`

export const SignBox = styled.div`
    position: relative;
    background-color: #fff;
    padding: 45px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Title = styled.h1`
    margin-bottom: -0.5rem;
    color: #333;
    font-weight: bold;
    font-size: 1.7rem;
`;

export const TextBox = styled.div`
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

export const Text = styled.h1`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 1.0rem;

`


export const Button = styled.button`
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    padding: 15px 20px;
    cursor: pointer;
    transition: filter 0.3s ease;
    &:hover {
        filter: brightness(0.8) !important; 
    }
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
`;
