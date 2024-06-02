import styled from "styled-components"

export const SearchContainer = styled.div`
    /* position: absolute;
    display: flex;
    justify-content: center;
    height: 5vh;
    padding-top: 3vh;
    z-index: 5; */
    position: fixed;
    display: flex;
    justify-content: center;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width:fit-content;
    
`;

export const SearchInput = styled.input`
    padding: 10px;
    font-size: 20px;
    border-radius: 10px;
    border: 3px solid #495057;
    width: 400px;
    background-image: url(${props => props.icon});
    background-size: 25px 25px;
    background-repeat: no-repeat;
    background-position: 15px center;
    padding-left: 48px;
    color: #36454F;
    /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); */
    outline: none;
    transition: all 0.5s ease-in-out;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    @media (max-width: 430px) {
        width: 48%;
    }
    &:focus{
        width:600px;
        box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
        @media (max-width:430px){
            width:200px;
        }
    }
`
export const SearchIcon = styled.img`
    position: absolute;
    left: 10px;
    top: 50%;
    stroke: red;
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
`;
