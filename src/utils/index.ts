import { jwtDecode } from "jwt-decode";

interface IToken {
  userId: number;
  username: string;
  type: string;
}

interface IDecodedToken {
  ok: boolean;
  token?: IToken;
}

export function saveTokens(accessToken: string, refreshToken: string): boolean {
  if (!accessToken || !refreshToken) {
    return false;
  }

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return true;
}

export const decodedToken = (): IDecodedToken => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return {
      ok: false,
    };
  }

  const decodedToken: IToken = jwtDecode(token);

  if (!decodedToken || !decodedToken.userId || !decodedToken.username) {
    return {
      ok: false,
    };
  }

  return {
    ok: true,
    token: decodedToken,
  };
};
