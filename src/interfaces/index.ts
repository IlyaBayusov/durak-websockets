export interface IBaseResponse {
  ok: boolean;
  status: number;
  message: string;
}

interface IUser {
  id: number;
  username: string;
  email: string;
  created_at: string;
  is_active: boolean;
  rating: number;
  games_played: number;
  games_won: number;
}

interface ILoginResponse {
  accessToken: string;
  user: IUser;
}

// export interface IApiResponse {
//   ok: boolean;
//   status: number;
//   message: string;
//   data: {
//     accessToken: string;
//     user: {
//       id: number;
//       username: string;
//       email: string;
//       created_at: string; // можно заменить на Date, если будет парсинг
//       is_active: boolean;
//       rating: number;
//       games_played: number;
//       games_won: number;
//     };
//   };
// }
