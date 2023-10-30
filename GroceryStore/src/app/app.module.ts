import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { MyCartComponent } from './Components/my-cart/my-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { MessageComponent } from './Components/message/message.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ProductDetailPageComponent } from './Components/product-detail-page/product-detail-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    NavBarComponent,
    MyCartComponent,
    AddProductComponent,
    MessageComponent,
    AdminDashboardComponent,
    ProductDetailPageComponent,
    OrderHistoryComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
        MatInputModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule,MatDialogModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
