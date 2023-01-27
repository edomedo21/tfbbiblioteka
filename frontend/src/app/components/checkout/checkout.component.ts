import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import { ResponseModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mg-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  showSpinner: Boolean;
  checkoutForm: any;
  authState: boolean;
  myUser: ResponseModel|any;
  id: Number;
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private  spinner: NgxSpinnerService,
              private fb: FormBuilder,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.userData$.subscribe((data: ResponseModel)=>{
      this.myUser = data;
      this.id = this.myUser.id;
      console.log(this.id);
    });
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  onCheckout() {
   this.spinner.show().then(p => {
      this.cartService.CheckoutFromCart(this.id);
    });


  //console.log(this.checkoutForm.value);

  }
}