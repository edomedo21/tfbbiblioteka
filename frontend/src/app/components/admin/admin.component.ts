import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { ProductModelServer, serverResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mg-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products: ProductModelServer[] = [];
  myUser: ResponseModel|any;
  provjera: boolean;
  successmsg: any;
  admin: boolean;
 

  constructor(private productService: ProductService,
              private userService: UserService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.userService.userData$
    .subscribe((data: ResponseModel) => {
      this.myUser = data;
      console.log(this.myUser);
      if(data.role == 777 || data.role == 999){
        this.productService.getAllProducts(25).subscribe((prods: serverResponse ) => {
          this.products = prods.products;
          this.provjera = true;
          if(data.role == 999){
            this.admin = false;
          }
          else{
            this.admin = true;
          }
      });
    }
    else {     
    }
    });  
}

deleteProduct(id: Number){
  console.log(id, 'deletedid==>');
  this.productService.deleteProduct(id).subscribe((res)=>{
    this.successmsg=' Uspješno obrisan proizvod!';
    this.productService.getAllProducts(25).subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      this.provjera = true;    
  });
  })
}

idiKreiraj() {
  this.router.navigateByUrl('/create');
  }

  idiKorisnike() {
    this.router.navigateByUrl('/users');
    }
  
}
