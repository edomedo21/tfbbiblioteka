import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductModelServer } from 'frontend-amar/src/app/models/product.model';
import { serverResponse } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {map} from "rxjs/operators";

declare let $: any;

@Component({
  selector: 'mg-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  product;
  num = 2 ;
  cat: string;
  products: ProductModelServer[] = [];
  constructor(private productService: ProductService,
              private http: HttpClient,
              private router:Router,
              private route:ActivatedRoute,
              private cartService: CartService,) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        console.log('ParamMap:', param);
        // @ts-ignore
        return param.params.catName;
      })
    ).subscribe(catName => {
      this.cat = catName;
      this.prikaziKategoriju1(this.cat);
      console.log(catName);
    });
  }


  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

  prikaziKategoriju1(catName1: string){
    this.productService.getProductsFromCategory(catName1).subscribe((response: serverResponse) => {
      this.products = response.products;
      console.log(this.products);
    });
  }
 
}