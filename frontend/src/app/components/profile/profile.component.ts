import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: ResponseModel|any;
  uloga: string;
  provjera: boolean

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.userData$
      .subscribe((data: ResponseModel) => {
        this.myUser = data;
        console.log(this.myUser);
        if(data.role == 777){
        this.uloga = "Admin";
        this.provjera = true;
        }
        else if (data.role == 999) {
          this.uloga = "Bibliotekar";
          this.provjera = true;
        }
        else {
          this.uloga = "Korisnik";
          this.provjera = false;
        }
      });
  }

  logout() {
    this.userService.logout();
  }

  admin(){
    this.router.navigateByUrl('/admin');
  }
}
