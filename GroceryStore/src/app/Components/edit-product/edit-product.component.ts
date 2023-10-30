import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.models';
import { LocalService } from 'src/app/services/local.service';
import { ProductsService } from 'src/app/services/products.service';
import { FileUploadService } from '../add-product/file-upload.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export  class  EditProductComponent implements OnInit {
  addProductRequest:Product = {
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
  id:number=0;
  ngOnInit(): void {
   var isAdmin= this.localServive.getData("isAdmin");
   if(isAdmin==null||JSON.parse(isAdmin)==false){
      this.router.navigateByUrl("/");   
   }
   this.activatedRoute.params.subscribe(params=>{
    this.id=params['id'];
  });
  this.productService.getProduct(this.id+"").subscribe({
    next:(value)=>{
      this.addProductRequest=value;
    }
  })
  }



 
  constructor(private  dialog:  MatDialog,private activatedRoute: ActivatedRoute, private  router:  Router,private fileUploadService: FileUploadService,private http:HttpClient,private productService:ProductsService,private localServive:LocalService) { }
  submit(){

   console.log(this.addProductRequest);
      this.productService.editProduct(this.addProductRequest,this.id).subscribe(
        {
          next:(product)=>{
            console.log(product);
            this.router.navigateByUrl("/");
          },
          error:(response)=>{
            console.log(response.message);
          }
        }
      );
      

  }
}