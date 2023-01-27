import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Alert } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'mg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string ="";
  password: string ="";
  fname: string="";
  lname: string="";
  email: string="";
  id: number;
  private SERVER_URL = environment.serverURL;
  constructor(private http: HttpClient) { }

  successmsg: any;

  ngOnInit(): void {
  }
  onSubmit() {
    
    this.http.post(`${this.SERVER_URL}auth/register`, {
      id: this.id,
      username: this.username,
      password: this.password,
      fname: this.fname,
      lname: this.lname,
      email: this.email
    }).subscribe(response => {
      console.log(response);
      this.successmsg = 'Uspješna prijava na server!';
    });
  }

}
