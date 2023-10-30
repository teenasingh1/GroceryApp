import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  baseApiUrl = "https://file.io"

  constructor(private http:HttpClient) { }

// Returns an observable
  // @ts-ignore
  upload(file):Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(environment.baseApiUrl+"/api/product/uploadImage",formData);
  }
}
