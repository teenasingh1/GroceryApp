import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupUser, User } from 'src/app/models/user.models';
import { LocalService } from 'src/app/services/local.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  ngOnInit(): void {
    var te=this.localStorage.getData("isLoggedIn");
    var isLogin= te!=null?JSON.parse(te):false;
    if(isLogin){
      this.router.navigateByUrl("/");
    }
  }
  user:SignupUser={
    name: "",
    email: "",
    phone: 0,
    password: "",
    isAdmin: false,
    orders: [],
    cart:{}
  }
  confirmPasswor:string='';
constructor(private http:HttpClient,private userService:UserService,private localStorage:LocalService,private router: Router){}
signup(){
  console.log(this.user);
  if(this.user.password!=this.confirmPasswor){
    return;
  }
 this.userService.signup(this.user).subscribe({
  next:(value)=> {
    console.log(value);
    this.localStorage.saveData("isLoggedIn",JSON.stringify(true));
    this.localStorage.saveData("user",JSON.stringify(value));
    this.localStorage.saveData("isAdmin",JSON.stringify(value.isAdmin));
    window.location.reload();
    this.router.navigateByUrl("/");
    
  },
 })
}

}
