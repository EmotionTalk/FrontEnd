import { useCookies } from 'react-cookie';

export const useCookieManager = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'accessTokenExpiresIn']);

  const setCookies = (accessToken, refreshToken, accessTokenExpiresIn) => {
    setCookie('accessToken', accessToken, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    setCookie('refreshToken', refreshToken, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    setCookie('accessTokenExpiresIn', accessTokenExpiresIn, { path: '/', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
  };

  const getCookies = () => {
    return {
      accessToken: cookies.accessToken,
      refreshToken: cookies.refreshToken,
      accessTokenExpiresIn: cookies.accessTokenExpiresIn
    };
  };

  const removeCookies = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    removeCookie('accessTokenExpiresIn');
  };

  return {
    setCookies,
    getCookies,
    removeCookies
  };
};
