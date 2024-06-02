import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 3px solid ${props => props.isValid === 'valid' ? 'green' : props.isValid === 'invalid' ? 'red' : 'black'};
    border-radius: 5px;
    outline: none;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: ${props => props.isValid === 'valid' ? 'green' : props.isValid === 'invalid' ? 'red' : 'blue'};
    }
`;

const Input = ({ type, placeholder, value, onChange, isValid }) => {
    return (
        <StyledInput
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isValid={isValid} // 유효성 상태를 스타일드 컴포넌트에 전달
        />
    );
};

export default Input;
