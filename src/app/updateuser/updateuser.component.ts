import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {DoctorService} from "../shared/doctor.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  title = 'projet';
  listUsers: User[];
  user: User;
  id:number;
  firstname:string;
  lastname:string;
  birthdate:string;
  email:string;
  password:string;
  phone:string;
  member:User[];
  formGroup: FormGroup;
  constructor(private docSer:DoctorService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("connecteduser"));
    this.formGroup=new FormGroup({
      firstname : new FormControl(this.user.firstname,[Validators.required]),
      lastname: new FormControl(this.user.lastname,[Validators.required]),
      birthdate: new FormControl(this.user.birthdate,[Validators.required]),
      email: new FormControl(this.user.email,[Validators.required]),
      password: new FormControl(this.user.password,[Validators.required]),
      phone: new FormControl(this.user.phone,[Validators.required])
    });
    var test = localStorage.getItem('connecteduser');
    interface MyObj {
      id:number;
      firstname:string;
      lastname:string;
      birthdate:string;
      email:string;
      password:string;
      phone:string;
    }
    let obj: MyObj = JSON.parse(test);
    this.id=obj.id;
    this.firstname=obj.firstname;
    this.lastname=obj.lastname;
    this.email=obj.email;
    this.birthdate=obj.birthdate;
    this.password=obj.password;
    this.phone=obj.phone;

  }

  updateuser() {

    Object.assign(this.user, this.formGroup.value);
      this.docSer.updateuser(this.id,this.user).subscribe(() => this.listUsers = this.listUsers.filter(user => user.id != this.user.id),);
    }



}
