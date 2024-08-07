import { useCookies } from 'react-cookie';

export const useCookieManager = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken', 'accessTokenExpiresIn']);

  const setCookies = (accessToken, refreshToken, accessTokenExpiresIn) => {
    const expiresInDate = new Date(Number(accessTokenExpiresIn));

    console.log("Setting cookies:");
    console.log("AccessToken:", accessToken);
    console.log("RefreshToken:", refreshToken);
    console.log("AccessTokenExpiresIn:", accessTokenExpiresIn, "Date:", expiresInDate);

    setCookie('accessToken', accessToken, { path: '/', expires: expiresInDate });
    setCookie('refreshToken', refreshToken, { path: '/', expires: expiresInDate });
    setCookie('accessTokenExpiresIn', accessTokenExpiresIn, { path: '/', expires: expiresInDate });
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
