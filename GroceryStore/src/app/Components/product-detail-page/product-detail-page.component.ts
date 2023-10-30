import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.models';
import { CartService } from 'src/app/services/cart.service';
import { LocalService } from 'src/app/services/local.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css']
})
export class ProductDetailPageComponent implements OnInit {
  productQuantity: number = 0;
 
   id:number=0;
  constructor(private router:Router,private activatedRoute: ActivatedRoute,private cartServices:CartService,private localService:LocalService,private productServices:ProductsService){}
  product:Product={
    productId: 0,
    name: '',
    description: '',
    category: '',
    availableQuantity: 0,
    imageUrl: '',
    price: 0,
    discount: 0,
    specification: ''
  }

  addToCart() {

    if(this.productQuantity<=this.product.availableQuantity){
      var ad=false;
      this.cart.map((v,i)=>{
        if(v.productId==this.id){
          v.quantity=this.productQuantity;
          ad=true;
        }
      })
      if(!ad){
        this.cart.push({
          productId: this.id,
          quantity: this.productQuantity
        })
      }
    }
    var  temp =this.localService.getData("id");
    console.log(temp)
      var idU = JSON.parse(temp||'');
    this.cartServices.updateCart({items:this.cart},idU).subscribe({
      next:(va)=>{
          alert("added");
      }
    })

  }
  cart:Cart[]=[];
  ngOnInit(): void {
    var loggedIn=this.localService.getData("isLoggedIn");
    loggedIn=JSON.parse(loggedIn||"false");
    if(loggedIn){
    this.activatedRoute.params.subscribe(params=>{
      this.id=params['id'];
    });
    this.productServices.getProduct(this.id+"").subscribe({
      next:(value)=>{
        this.product=value;
      }
    })
    var  temp =this.localService.getData("id");
    console.log(temp)
      var id = JSON.parse(temp||'');
    
     this.cartServices.getCart(id||'').subscribe(
       {
         next:(value) =>{
          this.cart=value;
          value.map((value1,index)=>{if(value1.productId==this.id){
            this.productQuantity=value1.quantity;
          }})
         }});

    
  }
  else{
    alert("please login to view detail");
    this.router.navigateByUrl("/");
  }
}
}
