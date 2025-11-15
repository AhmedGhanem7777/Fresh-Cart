export interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    [key: string]: any;
  }
  
  
  
  export interface IUser {
    name: string;
    email: string;
    phone: string;
    id: string;
  }
  
  export interface IUserAddress {
    name: string;
    details: string;
    phone: string;
    city: string;
  }
  
  export interface IChangePassword {
    currentPassword: string;
    password: string;
    rePassword: string;
  }
  
  export interface IApiResponse {
    message: string;
    data?: any;
  }