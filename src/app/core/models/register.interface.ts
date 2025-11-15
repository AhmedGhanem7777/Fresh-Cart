import { BaseResponse } from './base-response.interface';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface RegisterResponse extends BaseResponse {
  token: string;
  user: UserData;
}

export interface UserData {
  name: string;
  email: string;
  role: string;
  id: string;
}