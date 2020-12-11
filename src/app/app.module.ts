import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';
import { SamespecialityComponent } from './samespeciality/samespeciality.component';
import { UsersComponent } from './users/users.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { NgxSocialShareModule } from 'ngx-social-share';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AjouterdocteurComponent } from './ajouterdocteur/ajouterdocteur.component';
import { CalendrierrdvComponent } from './calendrierrdv/calendrierrdv.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorsComponent,
    DoctorComponent,
    SamespecialityComponent,
    UsersComponent,
    UpdateuserComponent,
    CommentairesComponent,
    AjouterdocteurComponent,
    CalendrierrdvComponent,
    UpdatepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSocialShareModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
