import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mg-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  successmsg: string;
  errormsg: string;
  myUser: ResponseModel|any;
  provjera: boolean;

  constructor(private productService: ProductService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userData$
    .subscribe((data: ResponseModel) => {
      this.myUser = data;
      console.log(this.myUser);
      if(data.role == 777 || data.role == 999){
        this.provjera = true;
    }
    else {
      this.provjera = false;
    }

    });  
  }

  userForm = new FormGroup({
    'title': new FormControl('',Validators.required),
    'image': new FormControl('',Validators.required),
    'images': new FormControl('',Validators.required),
    'description': new FormControl('',Validators.required),
    'price': new FormControl('',Validators.required),
    'quantity': new FormControl('',Validators.required),
    'short_desc': new FormControl('',Validators.required),
    'cat_id': new FormControl('',Validators.required)
  });

  options = [
    {value: 1, label: 'Elektrotehnički odsjek'},
    {value: 2, label: 'Građevinski odsjek'},
    {value: 3, label: 'Tekstilni odsjek'},
    {value: 4, label: 'Mašinski odsjek'},
    {value: 5, label: 'Drvnoindustrijski odsjek'}
  ];

  kreiraj(){
    if(this.userForm.valid){
      this.productService.createProduct(this.userForm.value).subscribe((res)=>{
        this.userForm.reset();
        this.successmsg='Uspjesno unijeti podaci u bazu podataka!';
      })
    }
    else {
      this.errormsg = 'Popunite sva polja!';
    }
  }

}
