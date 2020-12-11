import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoctorsComponent} from "./doctors/doctors.component";
import {HomeComponent} from "./home/home.component";
import {DoctorComponent} from "./doctor/doctor.component";
import {UsersComponent} from "./users/users.component";
import {UpdateuserComponent} from "./updateuser/updateuser.component";
import {AjouterdocteurComponent} from "./ajouterdocteur/ajouterdocteur.component";
import {CalendrierrdvComponent} from "./calendrierrdv/calendrierrdv.component";
import {UpdatepasswordComponent} from "./updatepassword/updatepassword.component";


const routes: Routes = [{path:'updatepassword',component:UpdatepasswordComponent} ,{path:'calendrier',component:CalendrierrdvComponent} ,{path:'doctors',component:DoctorsComponent} ,{path:'ajoutdoctor',component:AjouterdocteurComponent},{path:'updateuser',component:UpdateuserComponent}, {path:'adduser',component:UsersComponent} , {path:'home',component:HomeComponent} ,{path: '', redirectTo: 'home' ,pathMatch: 'full'},  { path: 'doctor-details/:id', component: DoctorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
