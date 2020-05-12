import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from '../../services/photo.service'
import {Photo} from "../../interfaces/photo";


@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id:string;
  photo:Photo;

  constructor(
    private activateRoute:ActivatedRoute,
    private router:Router,
    private photoservice:PhotoService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.photoservice.getPhotoPreview(this.id)
        .subscribe(
          res => {
            console.log(res);
            this.photo = res;
          },
          err => console.log(err)
        )
    })
  }

  deletephoto(id:string){
    this.photoservice.deletephoto(id)
      .subscribe(
        res =>{
          console.log(res)
          this.router.navigate(['photos'])
        },
        err => console.log(err)
      )
  }

  updatephoto(){
    this.photoservice.updatePhoto(this.photo)
    .subscribe(
        res => {
          console.log(res);
         this.photo = res;
         this. ngOnInit();

        },
        err => console.log(err)
      )
  }

}
