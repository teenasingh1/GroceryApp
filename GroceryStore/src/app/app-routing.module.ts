import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import {MyCartComponent} from "./Components/my-cart/my-cart.component";
import {AddProductComponent} from "./Components/add-product/add-product.component";
import {ProductDetailPageComponent} from "./Components/product-detail-page/product-detail-page.component";
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';

const routes: Routes = [
  {component : HomeComponent,path:''},
  {component : LoginComponent,path:'login'},
  {component : SignUpComponent,path :'SignUp'},
  {component: MyCartComponent, path: 'my-cart'},
  {component: AddProductComponent, path: 'add-product'},
  {component: ProductDetailPageComponent, path: 'view-product/:id'},
  {component: OrderHistoryComponent,path:'order-history'},
  {component:EditProductComponent,path:'edit-product/:id'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
