import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoBackService {

  constructor(private _Location:Location) { }

  // Navigates the user back to the previous page in the browser history
  goBack(){
    this._Location.back()
  }
}
