import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseModel, UserService, usersResponse } from 'src/app/services/user.service';

@Component({
  selector: 'mg-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  successmsg: string;
  getId: Number;
  provjera: boolean;
  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map((param: ParamMap)=>{
      console.log('ParamsMap', param);
      // @ts-ignore
      return param.params.userId;
    }    
    )).subscribe(userId =>{
      this.getId = userId;
      this.userService.userData$.subscribe((data:ResponseModel)=>{
          if(data.role == 777){
            this.provjera = true;
            this.userService.getSingleUser(this.getId).subscribe((res)=>{
              console.log(res.username);
              this.userForm.patchValue({
                username: res.username,
                email: res.email,
                fname: res.fname,
                lname: res.lname,
                age: res.age,
                role: res.role
              });
            });
          }
          else {
            console.log("Zabranjen Pristup!");
            this.provjera = false;
          }
      });
    })
  }

  userForm = new FormGroup({
    'username': new FormControl('',Validators.required),
    'email': new FormControl('',Validators.required),
    'fname': new FormControl('',Validators.required),
    'lname': new FormControl('',Validators.required),
    'age': new FormControl('',Validators.required),
    'role': new FormControl('',Validators.required)
  });

  options = [
    {value: 555, label: 'Korisnik'},
    {value: 777, label: 'Admin'},
    {value: 999, label: 'Bibliotekar'},
  ];

  updateUser(){
    if(this.userForm.valid){
      this.userService.updateUser(this.userForm.value, this.getId).subscribe((res)=>{
        this.successmsg = 'Uspjesan updejt!';
        console.log(res);
        console.log(this.userForm.valid);
      })
    }
    else {
      this.successmsg ="Greska u updejtu"
    }
    }
    
    
  

}
