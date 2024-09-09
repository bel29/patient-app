export interface IUserState {
  username: string;
  password?: string;
  isAuthenticated: boolean;
  error?: string;
  accessToken: string;
}
export interface IFormLogin {
  username: string;
  password: string;
}
