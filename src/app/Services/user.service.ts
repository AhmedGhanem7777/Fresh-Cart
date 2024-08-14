import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) { }

  // Fetches the profile data of a user by their ID
  getUserProfileDataById(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/users/${id}`)
  }


  // Updates the user's profile information
  updateUserProfile(userData: any): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe`, userData);
  }


  // Retrieves the user's profile information
  getUserProfileData(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/users`)
  }




  // Adds a new address for the user
  addUserAddress(userAddress: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/addresses`, userAddress
    )
  }


  // Removes a user's address by address ID
  removeUserAddress(id: any): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`
    )
  }

  // Fetches the addresses of the currently logged-in user
  getLoggedUserAddress(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/addresses`
    )
  }



  // Updates the password of the currently logged-in user
  updateLoggedUserPass(data: { currentPassword: string; password: string; rePassword: string }): Observable<any> {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', data);
  }
  

}
