import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorsComponent} from "./doctors/doctors.component";
import {HomeComponent} from "./home/home.component";
import {DoctorComponent} from "./doctor/doctor.component";
import {UsersComponent} from "./users/users.component";


const routes: Routes = [{path:'doctors',component:DoctorsComponent} , {path:'adduser',component:UsersComponent} , {path:'home',component:HomeComponent} ,{path: '', redirectTo: 'home' ,pathMatch: 'full'},  { path: 'doctor-details/:id', component: DoctorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
