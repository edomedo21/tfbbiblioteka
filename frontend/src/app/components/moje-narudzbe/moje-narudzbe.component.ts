import { Component, OnInit } from '@angular/core';
import { ProductModelServer, serverResponse } from 'src/app/models/product.model';
import { OrderService, ProductResponseModel } from 'src/app/services/order.service';
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mg-moje-narudzbe',
  templateUrl: './moje-narudzbe.component.html',
  styleUrls: ['./moje-narudzbe.component.scss']
})
export class  MojeNarudzbeComponent implements OnInit {
  products: ProductResponseModel [];
  korisnik: number;
  constructor(private orderService: OrderService,
              private userService: UserService) { }

  ngOnInit() { 
    this.userService.userData$.subscribe((res: ResponseModel)=>{
      this.korisnik = res.id;
      console.log(res.id);
      this.orderService.getOrdersFromOneUser(this.korisnik).subscribe((data: ProductResponseModel[])=>{
        this.products = data;
        console.log(this.products);
      });
    });
   
  }

}
