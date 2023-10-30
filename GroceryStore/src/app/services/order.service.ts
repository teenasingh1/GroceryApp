import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  ROOT_URL:string= environment.baseApiUrl;
  placeOrder(order:Order,id:string):Observable<Order>{
    return this.http.post<Order>(this.ROOT_URL+"/api/Order/place-order/"+id,order);
  }
  getOrders(id:string):Observable<Order[]>{
    return this.http.get<Order[]>(this.ROOT_URL+"/api/Order/get-order/"+id);
  }
}
