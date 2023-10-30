import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateCart(cart: object,id:string):Observable<User> {
    return this.http.put<User>(this.ROOT_URL+"/api/Cart/update-cart?id="+id,cart);
  }
  ROOT_URL:string= environment.baseApiUrl;

  constructor(private http:HttpClient) { }
  getCart(id:string): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.ROOT_URL+"/api/Cart/get-cart/"+id);

  }

  
}
