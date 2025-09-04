export interface IBaseResponse {
  ok: boolean;
  status: number;
  message: string;
}

export interface IUser {
  id: number;
  username: string;
  avatar_url: string;
  is_active: boolean;
  rating: number;
  games_played: number;
  games_won: number;
  created_at: string;
  updated_at: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IApiResponse<T> extends IBaseResponse {
  data: T;
}

export type RegistrResp = IApiResponse<ILoginResponse>;
export type AuthResp = IApiResponse<ILoginResponse>;

export interface IMessengerGroup {
  messengerGroupId: number;
  messengerItems: IMessengeItem[];
}

export interface IMessengeItem {
  id: number;
  messGroupId: number;
  senderId: number;
  recipientId: number;
  message: string;
  time: string;
  date: string;
}
