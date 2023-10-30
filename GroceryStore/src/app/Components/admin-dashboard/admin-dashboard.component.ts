import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { EditProductService } from 'src/app/services/edit-product.service';
import { LocalService } from 'src/app/services/local.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  product: Product[] =[
  ];
  constructor(private localStorage:LocalService,private editProductS:EditProductService,private productService:ProductsService,private router:Router){}
  ngOnInit(): void {
    var te=this.localStorage.getData("isAdmin");
    var isLogin= te!=null?JSON.parse(te):false;
    if(!isLogin){
      alert("login with admin credentials")
      this.router.navigateByUrl("/");
    }
    this.productService.getAllProduct().subscribe(
      {
        next:(product)=>{
          this.product=product;
        },
        error:(response)=>{
          console.log(response);
        }
      }
    );
  }
  deleteProduct( id:number){
    this.productService.deleteProduct(id).subscribe({
      next:(value)=>{
        alert("Product Deleted");
        window.location.reload();
        
      }
    })

  }

  
}
