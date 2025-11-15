export interface ResetCodeResponse {
    status: string;
    message?: string;
  }
  
  export interface ResetCodeRequest {
    resetCode: string;
  }
  export interface VerificationState {
    resetCode: string;
    isShaking: boolean;
    timeLeft: number;
  }