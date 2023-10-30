import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convert, User } from 'src/app/models/user.models';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private localService:LocalService,private router: Router){}
  isLogin :boolean|null = false;
  isAdmin :boolean = false;
  user:User|null=null;
  name:string="";
  ngOnInit() {
    var te=this.localService.getData("isLoggedIn");
   this.isLogin= te!=null?JSON.parse(te):false;
    te=this.localService.getData("user");
this.user=te!=null?Convert.toUser(te):null;
this.isAdmin=this.user!=null?this.user.isAdmin:false;
this.name=this.user!=null?this.user.name:"";

  }
  signout(){
    this.localService.clearData();
    window.location.reload();
    this.router.navigateByUrl("/");
  }

}
