import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../shared/doctor.service";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listUsers: User[];
  user: User;
  formGroup: FormGroup;
  loginform:FormGroup;
  member:User[];
  constructor(private docSer:DoctorService) { }

  ngOnInit(): void {
    this.user = new User();
    this.formGroup=new FormGroup({
      firstname : new FormControl('',[Validators.required,Validators.minLength(4)]),
      lastname: new FormControl('',[Validators.required,Validators.minLength(4)]),
      birthdate: new FormControl('',[Validators.required,Validators.email]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required])
    });
    this.loginform=new FormGroup({
      email : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  get firstname()
  {
    return this.formGroup.get('firstname');
  }
  get lastname()
  {
    return this.formGroup.get('lastname');
  }
  get birthdate()
  {
    return this.formGroup.get('birthdate');
  }
  get email()
  {
    return this.formGroup.get('email');
  }
  get password()
  {
    return this.formGroup.get('password');
  }
  get phone()
  {
    return this.formGroup.get('phone');
  }

  add() {
    Object.assign(this.user, this.formGroup.value);
    this.docSer.adduser(this.user).subscribe(() => this.listUsers = this.listUsers.filter(user => user.id != this.user.id),);

  }

  login(){
    this.docSer.login(this.loginform.value.email,this.loginform.value.password).subscribe((data: User[]) => this.member = data);
    setTimeout(() => {
      if (this.member.length!=0){
        var connecteduser = this.member[0];
        localStorage.setItem("connecteduser", JSON.stringify(connecteduser));
        var storeduser = JSON.parse(localStorage.getItem("connecteduser"));
        window.location.reload();
        window.location.href="http://localhost:4200/home";
      }
      else {
        alert("Verifier Vos Parametres");
      }
    }, 500);


  }




}
