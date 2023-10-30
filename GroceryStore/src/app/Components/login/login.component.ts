//import { Component } from '@angular/core';

//@Component({
  //selector: 'app-login',
  //templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
//})
//export class LoginComponent {

//}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string="";
  password: string="";
  ngOnInit(): void {
    var te=this.localStorage.getData("isLoggedIn");
    var isLogin= te!=null?JSON.parse(te):false;
    if(isLogin){
      this.router.navigateByUrl("/");
    }
  }
  constructor(private userService:UserService,private localStorage:LocalService,private router: Router){}
  login() {
    this.userService.login(this.username,this.password).subscribe(
      {
        next:(value)=> {
          this.localStorage.saveData("isLoggedIn",JSON.stringify(true));
          this.localStorage.saveData("user",JSON.stringify(value));
          this.localStorage.saveData("isAdmin",JSON.stringify(value.isAdmin));
          console.log(value.id)
          this.localStorage.saveData("id",JSON.stringify(value.id));
          console.log(value);
          window.location.reload();
          this.router.navigateByUrl("/");
        }
      }
    )
  }
}
