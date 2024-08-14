import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { DecodeToken } from '../interfaces/decode-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  // Holds the user data after decoding the token
  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    // Check if a user token exists in localStorage on initialization
    if (localStorage.getItem('userToken') !== null) {
      this.decodeUserData();
    }else{
      // Navigate to login if no token is found
      this._Router.navigate(["/home"])
    }
  }


  // Registers a new user by sending their data to the signup API
  register(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  // Logs in a user by sending their credentials to the signin API
  login(userData: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }


  // Decodes the user token from localStorage and updates the userData BehaviorSubject
  decodeUserData(): void {
    let encodeduserToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodeduserToken:any = jwtDecode(encodeduserToken);
    this.userData.next(decodeduserToken);
    console.log('Decoded',this.userData);
    console.log('Decoded dddd',decodeduserToken);
    return decodeduserToken
  }

  // Logs out the user by clearing the token from localStorage and navigating to the login page
  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  // Sends a request to initiate password reset for the given email
  forgetPass(email:any): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      {
        email
      }
    );
  }

  // Verifies the reset code sent to the user
  verifyResetCode(resetCode:any): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      {
        resetCode
      }
    );
  }



  // BehaviorSubject to store the current email during password reset
  currentEmail=new BehaviorSubject(null)

  // Resets the user's password using the email and new password provided
  resetPass(email:any,newPass:any): Observable<any> {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
      {
        email:email,
        newPassword:newPass,
      }
    );
  }

}
