import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PhotoListComponent} from "./components/photo-list/photo-list.component";
import { PhotoFormComponent } from "./components/photo-form/photo-form.component";
import {PhotoPreviewComponent} from "./components/photo-preview/photo-preview.component";

const routes: Routes = [
  {
    path:'photos/:page',
    component:PhotoListComponent
  },
  {
    path:'photo/new',
    component:PhotoFormComponent
  },
  {
    path:'photo/:id',
    component:PhotoPreviewComponent
  },
  {
    path:'',
    redirectTo:'photos/1',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'photo/new',
    pathMatch:'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
