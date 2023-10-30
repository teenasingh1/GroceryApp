import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login, SignupUser, User } from '../models/user.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ROOT_URL:string= environment.baseApiUrl;
  constructor(private http:HttpClient) { }
  signup(user:SignupUser):Observable<SignupUser>{
    return  this.http.post<SignupUser>(this.ROOT_URL+"/api/profile/signup",user);
    
  }
  login(email:string,password:string):Observable<User>{
    return this.http.get<User>(this.ROOT_URL+"/api/profile/login?email="+email+"&password="+password);

  }
}
