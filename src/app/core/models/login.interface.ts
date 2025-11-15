import { BaseResponse } from './base-response.interface';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends BaseResponse {
  token: string;
  user: UserData;
}

export interface UserData {
  name: string;
  email: string;
  role: string;
  id: string;
}