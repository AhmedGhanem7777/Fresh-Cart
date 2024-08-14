import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../Services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor{

  constructor(public _LoadingService:LoadingService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._LoadingService.isLoading.next(true)

    return next.handle(req).pipe(
      finalize(
        ()=>{
          this._LoadingService.isLoading.next(false)
        }
      )
    )
  }

}
