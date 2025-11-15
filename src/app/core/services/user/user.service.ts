import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApiResponse, IUser, IChangePassword, IUserAddress } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // BehaviorSubject to hold the profile image URL, which will emit updates to subscribers
  profileImage = new BehaviorSubject('../../../../../assets/images/user-Csi4vjZh.png')

  constructor(private _HttpClient: HttpClient) { }

  // Fetches the user profile data by user ID
  getUserProfileDataById(id: string): Observable<IApiResponse> {
    return this._HttpClient.get<IApiResponse>(`https://ecommerce.routemisr.com/api/v1/users/${id}`)
  }

  // Updates the logged-in user's profile data
  updateUserProfile(userData: IUser): Observable<IApiResponse> {
    return this._HttpClient.put<IApiResponse>(`https://ecommerce.routemisr.com/api/v1/users/updateMe`, userData,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    );
  }

  // Updates the logged-in user's password
  updateLoggedUserPass(data: IChangePassword): Observable<IApiResponse> {
    return this._HttpClient.put<IApiResponse>('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', data,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    );
  }

  // Adds a new address for the logged-in user
  addUserAddress(userAddress: IUserAddress): Observable<IApiResponse> {
    return this._HttpClient.post<IApiResponse>(`https://ecommerce.routemisr.com/api/v1/addresses`, userAddress,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }

  // Fetches the logged-in user's saved addresses
  getLoggedUserAddress(): Observable<IApiResponse> {
    return this._HttpClient.get<IApiResponse>(`https://ecommerce.routemisr.com/api/v1/addresses`,
      {
        headers: {
          token: localStorage.getItem('userToken') || ''
        }
      }
    )
  }
}
