import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Order, OrderItem } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { LocalService } from 'src/app/services/local.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit{
  id=0;
  quantity=0;
  cart:Cart[]=[]
  constructor(private cartServices:CartService,private router:Router,private orderService:OrderService,private localService:LocalService, private productService:ProductsService){}
  carts= {
    items :[
      {
        productId :{
          _id:"apple",
          name :"Apple",
          price :100,
          image:"https://media.tenor.com/1HdVv6rRFcQAAAAM/excited-apple.gif",
          maxQuantity:0
        },
        total:100,
        quantity:1,
  

      }
    ],
     subTotal:0,

  }
  ngOnInit(): void {
    var te=this.localService.getData("isLoggedIn");
    var isLogin= te!=null?JSON.parse(te):false;
    if(!isLogin){
      this.router.navigateByUrl("/");
    }
   var  temp =this.localService.getData("id");
   console.log(temp)
     var id = JSON.parse(temp||'');
    this.carts.items.pop();
    this.cartServices.getCart(id||'').subscribe(
      {
        next:(value) =>{
          console.log(value);
          
          if(value.length==0){

          }
          else{
//subtotal
value.map((value2,index)=>{
var pId=value2.productId;
this.productService.getProduct(pId+"").subscribe({
  next:(value1)=> {
    this.carts.items.push({productId:{_id:value1.productId+"",name:value1.name,maxQuantity:value1.availableQuantity,image:value1.imageUrl,price:value1.price},quantity:value2.quantity,total:value2.quantity*value1.price});
    this.carts.subTotal+=value2.quantity*value1.price;
  },
})
});
          }
        },
      }
    )
    
  }
  // @ts-ignore
  _increamentQTY( id,  quantity): void {
    const indexFound = this.carts.items.findIndex(item => item.productId._id == id);
    this.carts.items[indexFound].quantity =  quantity;
    this.carts.items[indexFound].total = this.carts.items[indexFound].quantity * this.carts.items[indexFound].productId.price;
 
    this.carts.subTotal = this.carts.items.map(item => item.total).reduce((acc, next) => acc + next);
    
  this.update();
  }
  // @ts-ignore
  _decreamentQTY( id,  quantity): void {
    const indexFound = this.carts.items.findIndex(item => item.productId._id == id);
    if ( quantity <= 0) {
      this.carts.items.splice(indexFound, 1);
      if (this.carts.items.length == 0) {
        this.carts.subTotal = 0;
      } else {
        this.carts.subTotal = this.carts.items.map(item => item.total).reduce((acc, next) => acc + next);
      }
    }
    else {
      this.carts.items[indexFound].quantity =  quantity;
      this.carts.items[indexFound].total = this.carts.items[indexFound].quantity * this.carts.items[indexFound].productId.price;
      
        this.carts.subTotal = this.carts.items.map(item => item.total).reduce((acc, next) => acc + next);
      
    }
    this.update();

  }
  _emptyCart(): void {
    while(this.carts.items.length>0){
      this.carts.items.pop()
    }
    this.carts.subTotal=0;
    this.update();
  }
  update(){
    this.carts.items.map((value,index)=>{
   
      this.cart.push({productId:Number(value.productId._id),quantity:value.quantity});
    })
console.log(JSON.stringify({items:this.cart}));
    this.cartServices.updateCart({items:this.cart},JSON.parse(this.localService.getData("id")||'')).subscribe({
      next:(value)=>{


      }
    })
  }


  PlaceOrder(){
    var orderItem:OrderItem[]=[];
    this.carts.items.map((value,index)=>{
orderItem.push({productName:value.productId.name,unitPrice:value.productId.price,quantity:value.quantity});
    })
    var order:Order={
    orderDate:new Date(),
    status:0,
    totalAmount:this.carts.subTotal,
orderItems:orderItem
  


  }
  this.orderService.placeOrder(order,JSON.parse(this.localService.getData("id")||'')).subscribe({
    next:(value)=>{
      alert("Order Placed");
      console.log(value);

    }
  })
  this._emptyCart();

  }


}
