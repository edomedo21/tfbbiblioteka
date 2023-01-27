import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth:boolean = false;
  private SERVER_URL = environment.serverURL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<ResponseModel>(null);

  constructor(private httpClient: HttpClient) { }

  //login 
  loginUser(email:string, password:string){
      this.httpClient.post(`${this.SERVER_URL}auth/login`,{email,password}).subscribe((data: ResponseModel)=>{
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userData$.next(data);
      });
  }
  //logout
  logout(){
    this.auth = false;
    this.authState$.next(this.auth);
  }
  
}

export interface ResponseModel{
  token:string;
  auth:boolean;
  email:string;
  username:string;
  fname:string;
  lname:string;
  photoUrl:string;
  userId:number;
}

