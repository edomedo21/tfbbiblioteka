import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModelServer, serverResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];
  authState:boolean;

  query = '';
  results: any = [];
  private SERVER_URL = environment.serverURL;
selectedItem: string | any;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router:Router,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.productService.getAllProducts(10).subscribe((prods: serverResponse ) => {
      this.products = prods.products;
      console.log(this.products); 
      console.log(this.results.length);
    });
    
    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

  search(){
    this.http.get(`${this.SERVER_URL}auth/search`, { params: { q: this.query}}).subscribe(results => {
      this.results = results;
      console.log(this.results);
    });
    
  }

  izaberikat(selectedItem){
    this.router.navigate(['/category', selectedItem]).then();
  }


}
