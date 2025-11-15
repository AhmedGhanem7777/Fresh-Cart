export interface ResetPasswordRequest {
    email: string;
    newPassword: string;
  }
  
  export interface ResetPasswordResponse {
    token: string;
    status: string;
    message?: string;
  }