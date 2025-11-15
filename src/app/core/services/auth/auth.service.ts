import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/login.interface';
import { RegisterRequest, RegisterResponse } from '../../models/register.interface';
import { ForgotPasswordResponse } from '../../models/forgot-pass.interface';
import { ResetCodeRequest, ResetCodeResponse } from '../../models/verify-email.interface';
import { ResetPasswordRequest, ResetPasswordResponse } from '../../models/reset-pass.interface';
import { UserData } from '../../models/user.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // BehaviorSubject to hold the current user's data, initialized with null
  userData = new BehaviorSubject<LoginResponse['user'] | null>(null);

  // BehaviorSubject to hold the current email (used in password recovery flow), initialized with null
  currentEmail = new BehaviorSubject<string | null>(null);

  // Base API URL for authentication endpoints
  private readonly API_URL = 'https://ecommerce.routemisr.com/api/v1/auth';


  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // Automatically decode user data if a valid token exists in localStorage
    this.decodeUserData()
  }

  // Log in a user and return an observable of the login response
  login(userData: LoginRequest): Observable<LoginResponse> {
    return this._HttpClient.post<LoginResponse>(`${this.API_URL}/signin`, userData);
  }

  // Check if the user is authenticated by verifying the presence of a token
  isAuthenticated(): boolean {
    return localStorage.getItem('userToken') == null;
  }

  // Register a new user and return an observable of the registration response
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this._HttpClient.post<RegisterResponse>(`${this.API_URL}/signup`, userData);
  }

  // Log out the user by clearing the token and resetting user data
  logOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('profileImage');
    this.userData.next(null);
    this._Router.navigate(['auth/login']);
  }

  // Decode and retrieve user data from the stored JWT token
  decodeUserData(): UserData | null {
    if (localStorage.getItem('userToken')) {
      const encodeduserToken = localStorage.getItem('userToken');
      if (encodeduserToken) {
        try {
          const decodeduserToken = jwtDecode<UserData>(encodeduserToken);
          this.userData.next(decodeduserToken);

          return decodeduserToken;
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
      console.error('No token found in localStorage');
    }
    return null;
  }

  // Request a password reset link by sending the user's email
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this._HttpClient.post<ForgotPasswordResponse>(`${this.API_URL}/forgotPasswords`, { email });
  }

  // Verify the reset code sent to the user's email
  verifyResetCode(resetCode: string): Observable<ResetCodeResponse> {
    const request: ResetCodeRequest = { resetCode };
    return this._HttpClient.post<ResetCodeResponse>(`${this.API_URL}/verifyResetCode`, request);
  }

  // Reset the user's password using the provided email and new password
  resetPassword(email: string, newPassword: string): Observable<ResetPasswordResponse> {
    const request: ResetPasswordRequest = { email, newPassword };
    return this._HttpClient.put<ResetPasswordResponse>(`${this.API_URL}/resetPassword`, request);
  }
}
