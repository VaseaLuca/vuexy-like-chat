import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value);
}
export const getCookie = <T>(key: string) => {
  const value = Cookies.get(key);

  if (value) {
    return JSON.parse(value) as T;
  }
}