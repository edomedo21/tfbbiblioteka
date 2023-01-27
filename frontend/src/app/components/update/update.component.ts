import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductModelServer } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mg-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private userService: UserService) { }
  getparamid:any;
  successmsg:any;
  id: Number;
  cat_id: Number;
  provjera: boolean;
  myUser: ResponseModel|any;
  

  ngOnInit(): void {

    this.route.paramMap.pipe(map((param: ParamMap)=>{
      console.log('ParamsMap:', param);
        // @ts-ignore
        return param.params.prodId;
    })).subscribe(prodId =>{
      this.id = prodId;
      console.log(this.id);
      this.userService.userData$
    .subscribe((data: ResponseModel) => {
      this.myUser = data;
      if(data.role == 777 || data.role == 999){
        this.productService.getSingleProduct(this.id).subscribe((res)=>{
          this.provjera = true;
          this.userForm.patchValue({
            title: res.name,
            image: res.image,
            description: res.description,
            price: res.price,
            quantity: res.quantity,
            cat_id: res.category
          });
        })
    }
    else {
      this.successmsg='Greška u promjenama!';
    }

    }); 
    });
  }

  userForm = new FormGroup({
    'title': new FormControl('',Validators.required),
    'image': new FormControl('',Validators.required),
    'description': new FormControl('',Validators.required),
    'price': new FormControl('',Validators.required),
    'quantity': new FormControl('',Validators.required),
    'cat_id': new FormControl('',Validators.required)
  });

  options = [
    {value: 1, label: 'Elektrotehnički odsjek'},
    {value: 2, label: 'Građevinski odsjek'},
    {value: 3, label: 'Tekstilni odsjek'},
    {value: 4, label: 'Mašinski odsjek'},
    {value: 5, label: 'Drvnoindustrijski odsjek'}
  ];

    updateProduct(){
      if(this.userForm.valid){
      this.productService.updateProduct(this.userForm.value, this.id).subscribe((res)=>{
        console.log(res);
        this.successmsg = 'Uspjesne promjene!';
      });
    }
    }

    idiKreiraj() {
      this.router.navigateByUrl('/create');
      }
}
