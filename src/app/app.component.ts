import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from './Services/loading.service';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(public _LoadingService:LoadingService){}

  ngOnInit(): void {}

  title = 'proj';
}
