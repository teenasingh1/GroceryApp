import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.models';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { LocalService } from 'src/app/services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
   orders:Order[]=[{
    orderDate: new Date(),
    totalAmount: 0,
    status: 0,
    orderItems: []
  }];
  constructor(private orderServie:OrderService,private localService:LocalService,private router:Router){}
  
  ngOnInit(): void {
    var te=this.localService.getData("isLoggedIn");
    var isLogin= te!=null?JSON.parse(te):false;
    if(!isLogin){
      this.router.navigateByUrl("/");
    }
    console.log(this.localService.getData("id"))
    this.orderServie.getOrders(JSON.parse(this.localService.getData("id")||'')).subscribe({
      next:(value)=> {
        this.orders=value;
      },
    })
    console.log(this.orders)
  }

}
