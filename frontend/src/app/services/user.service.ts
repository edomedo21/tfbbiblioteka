import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { odgovor, UserModelServer } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth:boolean = false;
  private SERVER_URL = environment.serverURL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<ResponseModel>(null);
  userRole:number;
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  //login 
  loginUser(email:string, password:string){
      this.httpClient.post(`${this.SERVER_URL}auth/login`,{email,password}).subscribe((data: ResponseModel)=>{
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userRole = data.role;
        this.userData$.next(data);
        console.log(this.userRole);
        if(this.userRole === 777){
          this.router.navigateByUrl('admin').then();
        }
      });
  }
  //logout
  logout(){
    this.auth = false;
    this.authState$.next(this.auth);
  }

  getAllUsers(): Observable<odgovor>{
    return this.httpClient.get<odgovor>(`${this.SERVER_URL}users`);
  }

  getSingleUser(id: Number): Observable<UserModelServer>{
    return this.httpClient.get<UserModelServer>(`${this.SERVER_URL}users/` + id);
  }

  deleteUser(id: Number): Observable<UserModelServer>{
      return this.httpClient.delete<UserModelServer>(`${this.SERVER_URL}users/` + id);
  }
  
  updateUser(data: any, id: Number){
    return this.httpClient.put(`${this.SERVER_URL}users/korisnik/` + id, data);
  }

  createUser(data: any){
    return this.httpClient.post(`${this.SERVER_URL}users/create`, data);
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
  id:number;
  role: number;
}

export interface usersResponse {
  korisnici: ResponseModel[];
}

