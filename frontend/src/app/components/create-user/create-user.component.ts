import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mg-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  successmsg: string;
  provjera: boolean;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData$.subscribe((res:ResponseModel)=>{
      if(res.role == 777){
        this.provjera = true;
      }
      else {
        this.provjera = false;
      }
    })
  }

  
  userForm = new FormGroup({
    'username': new FormControl('',Validators.required),
    'email': new FormControl('',Validators.required),
    'fname': new FormControl('',Validators.required),
    'lname': new FormControl('',Validators.required),
    'age': new FormControl('',Validators.required),
    'role': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required),
    'id': new FormControl('',Validators.required)
  });

  options = [
    {value: 555, label: 'Korisnik'},
    {value: 777, label: 'Admin'},
    {value: 999, label: 'Bibliotekar'},
  ];

  kreiraj(){
    this.userService.createUser(this.userForm.value).subscribe((res)=>{
      this.successmsg = 'Uspjesno kreiran korisnik';
    })
  }

}
