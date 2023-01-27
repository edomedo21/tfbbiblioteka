import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serverResponse } from 'src/app/models/product.model';
import { odgovor, UserModelServer } from 'src/app/models/user.model';
import { ResponseModel, UserService, usersResponse } from 'src/app/services/user.service';

@Component({
  selector: 'mg-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.scss']
})
export class AdminusersComponent implements OnInit {
  myUser: ResponseModel|any;
  provjera: boolean;
  successmsg: any;
  korisnici: UserModelServer[];
  
  constructor(private userService: UserService,
              private router: Router
              ) { }

  ngOnInit() {
    this.userService.userData$
    .subscribe((data: ResponseModel) => {
      this.myUser = data;
      console.log(this.myUser);
      if(data.role == 777){
        this.userService.getAllUsers().subscribe((res: odgovor)=>{
          this.korisnici = res.korisnici;
          console.log(res);
          this.provjera = true;
        });
    }
    else {     
    }
    });  
}

deleteUser(id: Number){
  this.userService.deleteUser(id).subscribe((res)=>{
    this.successmsg = 'Uspjesno obrisan korisnik';
    this.userService.getAllUsers().subscribe((res: odgovor)=>{
      this.korisnici = res.korisnici;
    })
  })
}

kreirajUser(){
  this.router.navigateByUrl('createUser');
}

}
