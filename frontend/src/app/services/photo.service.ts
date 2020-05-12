import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import {Photo} from "../interfaces/photo";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URI = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  createPhoto(title:string, descrpcion:string, photo:File){
   const fd =  new FormData();
   fd.append('title',title);
   fd.append('descripcion',descrpcion);
   fd.append('imagen',photo);
   return this.http.post(this.URI,fd);
  }

  getPhotos(page:number){
    return this.http.get<Photo[]>(this.URI+page);
  }

  getPhotoPreview(id:string){
    return this.http.get<Photo>(this.URI +'noticia/'+id);
  }

  deletephoto(id:string){
    return this.http.delete(this.URI+'delete/'+id);
  }

  updatePhoto(photo){
    return this.http.put<Photo>(this.URI+'update/'+photo._id, photo);
  }
}
