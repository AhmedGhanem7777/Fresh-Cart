import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { LoadingService } from '../Services/loading.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private _LoadingService: LoadingService) { }

  // Intercepts outgoing HTTP requests and adds a token to the header
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Retrieve the token from localStorage
    let token: any = localStorage.getItem('userToken') || ''

    // Clone the original request and add the token to the headers
    let updatedRequest = request.clone({
      headers: request.headers.set('token', token)
    })

    // Pass the updated request to the next handler in the chain
    return next.handle(updatedRequest);
  }
}







// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { LoadingService } from '../Services/loading.service';

// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {

//   constructor(private _LoadingService: LoadingService) { }

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     // Retrieve the token from localStorage
//     let token: any = localStorage.getItem('userToken') || '';

//     // Start loading
//     this._LoadingService.isLoading.next(true);

//     // Clone the original request and add the token to the headers
//     let updatedRequest = request.clone({
//       headers: request.headers.set('token', token)
//     });

//     // Pass the updated request to the next handler in the chain
//     return next.handle(updatedRequest).pipe(
//       // Use finalize to ensure loading stops in both success and error cases
//       finalize(() => {
//         this._LoadingService.isLoading.next(false);
//       })
//     );
//   }
// }











// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { finalize } from 'rxjs/operators';
// import { LoadingService } from '../Services/loading.service';


// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {

//   constructor(private loadingService: LoadingService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     this.loadingService.showLoading();

//     return next.handle(request).pipe(
//       finalize(() => this.loadingService.hideLoading())
//     );
//   }
// }








