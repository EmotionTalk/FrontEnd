// styles.js
import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    min-height: 200px;
    position: relative;
    background-color: #fff;
    padding: 45px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.h3`
    margin-top: 0rem;
    margin-bottom: 0rem;
    color: #333;
    font-weight: normal;
    font-size: 30px;
`;

export const Subtitle = styled.p`
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
    margin-left: 17px;
`;

export const ModalBody = styled.div``;

export const EmailContainer = styled.div`
    margin-bottom: 15px;
`;

export const EmailLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    margin-top: 30px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const EmailInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: 0.1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const PasswordContainer = styled.div`
    margin-bottom: 15px;
`;

export const PasswordCheckContainer = styled.div`
    margin-bottom: 15px;
`;

export const PasswordLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const PasswordCheckLabel = styled.label`
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const PasswordInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: 0.2rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const PasswordCheckInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: 0.2rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const ErrorMessage = styled.div`
    position: absolute;
    color: red;
    font-size: 11px;
    margin-top: -2px;
`;

export const NickNameContainer = styled.div` 
    margin-bottom: 15px;
`;

export const NickNameLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const NickNameInputContainer = styled.div`
    display: flex;
`;

export const NickNameInput = styled.input`
    width: 130px;
    padding: 10px;
    margin-bottom: 0.1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const NickNameCheckButton = styled.button`
    width: 100px;
    padding: 10px;
    border: none;
    border-radius: 30px;
    background-color: var(--primary-color);

    color: white;
    margin-bottom: 0rem;
    margin-top: 0rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: filter 0.3s ease;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
    &:disabled{
        background-color: #dfdddd;
        color: #a7a7a7;
    }
`;

export const BirthContainer = styled.div`
    margin-bottom: 15px;
`;

export const BirthLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const BirthInput = styled.input`
    width: 250px;
    padding: 10px;
    margin-bottom: 0.1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const GenderContainer = styled.div`
    margin-bottom: 15px;
`;

export const GenderLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 1rem;
    font-weight: normal;
`;

export const GenderInput = styled.input`
    margin-right: 5px;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
`;

export const ConfirmButton = styled.button`
    width: 270px;
    padding: 10px;
    border: none;
    margin-top: 20px;
    border-radius: 30px;
    background-color:  var(--primary-color);
    color: white;
    margin-bottom: -1.6rem;
    cursor: pointer;
    transition: filter 0.3s ease;
    display:block;
  
    &:hover {
        filter: brightness(0.9) !important;
    }
`;

export const SelectInput = styled.select`
    width: 272px;
    padding: 10px;
    margin-bottom: 0.1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border:1px solid green;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); 

    }
`;

export const SuccessMessage = styled.div`
    position: absolute;
    top: 440px;
    color: green;
    font-size: 11px;
    margin-top: 5px;
`;

export const ErrorNickMessage = styled.div`
    position: absolute;
    color: red;
    font-size: 0.8rem;
    margin-top: -2px;
    font-size: 11px;
`;