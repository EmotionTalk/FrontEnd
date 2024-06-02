import React from "react";
import searchIcon from "../../assets/search.svg"
import * as S from "./style";

const SearchIcon = () => {
    return (
        <S.SearchContainer>
            <S.SearchInput icon={searchIcon} type="text" placeholder="" />
        </S.SearchContainer>
    );
};

export default SearchIcon;