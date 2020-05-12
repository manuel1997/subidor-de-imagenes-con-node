import { Component, OnInit } from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos = [];
  page:number;
  pages:number;


  constructor(
    private photoService:PhotoService,
     private router:Router,
     private activateRoute:ActivatedRoute,
    
    ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.page = params['page'];
    this.photoService.getPhotos(this.page)
    .subscribe(
      res => {
        
        this.photos = res['noticias'];
        this.pages = res['pages'];

        if(res['mensaje'] == 0){
          this.router.navigate(['photos/1'])
        }
      },
      err => console.log(err),
      )
  }) 
}


  selectedCard(id:string){
    this.router.navigate(['/photo',id]);
  }

}
