import { Component,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { LocalService } from 'src/app/services/local.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  p:number = 1;
  itemsPerPage:number =3;
  totalProduct:any;
  product: Product[] =[
  ];
  isAdmin: boolean = true;
  constructor(private productsService:ProductsService,private localStorage:LocalService){}
  ngOnInit():void{
this.isAdmin=JSON.parse(this.localStorage.getData("isAdmin")||'false');
    this.productsService.getAllProduct().subscribe(
      {
        next:(product)=>{
          this.product=product;
          this.totalProduct = product.length;
        },
        error:(response)=>{
          console.log(response);
        }
      }
    );

  }


}
