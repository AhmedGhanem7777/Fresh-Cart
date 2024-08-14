import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  // showLoading(){
  //   this.isLoading.next(true)
  // }

  // hideLoading(){
  //   this.isLoading.next(false)
  // }
}
