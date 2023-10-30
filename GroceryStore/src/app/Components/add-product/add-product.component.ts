
import { Component, OnInit } from  '@angular/core';

import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import {MessageComponent} from "../message/message.component";
import {Router} from "@angular/router";
import {FileUploadService} from "./file-upload.service";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';
import { LocalService } from 'src/app/services/local.service';

// .. other imports

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export  class  AddProductComponent implements OnInit {
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
 
  loading: boolean = false; // Flag variable
  public file: File | null = null;
  ngOnInit(): void {
   var isAdmin= this.localServive.getData("isAdmin");
   if(isAdmin==null||JSON.parse(isAdmin)==false){
      this.router.navigateByUrl("/");   
   }
  }
//file upload
  onChange(event:any) {
   
    this.file = event.target.files[0];
  }

  onUpload() {
    
    this.loading = !this.loading;
    //Outputs the 'file' variable to the console
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
        // Outputs the 'link' property of the 'event' object to the console
        console.log(event.link);
        // Sets the 'imageUr1' property of 'addProductRequest' to the 'link' value from the 'event' object
         this.addProductRequest.imageUrl = event.link;
         // Sets the 'loading' variable to false
          this.loading = false; // Flag variable
        }

      }
    );
  }
  constructor(private  dialog:  MatDialog, private  router:  Router,private fileUploadService: FileUploadService,private http:HttpClient,private productService:ProductsService,private localServive:LocalService) { }
  submit(){

   console.log(this.addProductRequest);
      this.productService.addProduct(this.addProductRequest).subscribe(
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
