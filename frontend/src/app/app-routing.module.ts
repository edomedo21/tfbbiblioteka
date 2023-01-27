import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ProductComponent} from "./components/product/product.component";
import {ThankyouComponent} from "./components/thankyou/thankyou.component";
import {ProfileComponent} from './components/profile/profile.component';
import { ProfileGuard } from './guard/profile.guard';
import { PocetnaComponent } from './components/pocetna/pocetna.component';
import { CategoryComponent } from './components/category/category.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdateComponent } from './components/update/update.component';
import { CreateComponent } from './components/create/create.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { MojeNarudzbeComponent } from './components/moje-narudzbe/moje-narudzbe.component';



const routes: Routes = [
  
  {
    path:'', redirectTo:'/pocetna', pathMatch:'full'
  },
 {
  path: 'pocetna', component: PocetnaComponent
 },

  {
    path: 'rent', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate:[ProfileGuard]
  },
  {
    path: 'category/:catName', component: CategoryComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'proizvod/:prodId', component: UpdateComponent 
  },
  {
    path: 'create', component:CreateComponent
  },
  {
    path: 'users', component:AdminusersComponent
  },
  {
    path: 'korisnik/:userId', component:UpdateUserComponent
  },
   {
    path: 'createUser', component:CreateUserComponent
   },
   {
    path: 'mojeNarudzbe', component:MojeNarudzbeComponent
   }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
