import React from 'react';
import * as S from './styles';
import cat404 from '../../../assets/cat404.png';
const NotFoundPage = () => {

    const GoMainPage = () => {
        window.location.href = '/';
    }


    return (
        <S.Container>
            <S.ErrorCode>404</S.ErrorCode>
            <S.ErrorMessage>This page is taking a nap!</S.ErrorMessage>
            <S.Image src={cat404}/>
            <S.GoMainPage onClick={GoMainPage}>go main</S.GoMainPage>
        </S.Container>
    );
};

export default NotFoundPage;