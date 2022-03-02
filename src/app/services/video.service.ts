import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  //Upload Video token
  public uploadVideo(fileEntry:File){
     const formData=new FormData();
     formData.append('file',fileEntry,fileEntry.name) 
     console.log('inside upload file '+fileEntry.name)
    return this.http.post(`${baseURL}/api/videos/add`,formData); 
  }
  
}
