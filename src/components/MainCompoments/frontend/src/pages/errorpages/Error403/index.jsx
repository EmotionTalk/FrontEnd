import React from 'react';
import * as S from './styles';

const ForbiddenPage = () => {
  return (
    <S.Container>
      <S.Text>403 Forbidden</S.Text>
      <S.Text>죄송합니다. 해당 페이지에 접근할 권한이 없습니다.</S.Text>
    </S.Container>
  );
};

export default ForbiddenPage;
