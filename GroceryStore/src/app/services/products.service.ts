import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 ROOT_URL:string= environment.baseApiUrl;

  constructor(private http:HttpClient) { }
  getAllProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.ROOT_URL+"/api/Product/get-all-products");
  }
  addProduct(addProductRequest:Product):Observable<Product>{
   return  this.http.post<Product>(this.ROOT_URL+"/api/product/add-product",addProductRequest);
  }
  getProduct(id:string):Observable<Product>{
    return this.http.get<Product>(this.ROOT_URL+"/api/Product/"+id);
  }
  deleteProduct(id:number):Observable<Product>{
    return this.http.delete<Product>(this.ROOT_URL+"/api/Product/delete-product/"+id);
  }
  editProduct(product:Product,id:number):Observable<Product>{
    return this.http.put<Product>(this.ROOT_URL+"/api/Product/edit-product/"+id,product);
  }
}
