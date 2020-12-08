import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../shared/doctor.service";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import "../../assets/smtp.js";
import {Doctor} from "../model/doctor";
declare let Email: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  listUsers: User[];
  user: User;
  Doctor: Doctor[];
  formGroup: FormGroup;
  loginform:FormGroup;
  member:User[];
  show:number;
  constructor(private docSer:DoctorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user = new User();


    this.formGroup=new FormGroup({
      firstname : new FormControl('',[Validators.required,Validators.minLength(4)]),
      lastname: new FormControl('',[Validators.required,Validators.minLength(4)]),
      birthdate: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(4)]),
      phone: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmpassword: new FormControl('',[Validators.required,Validators.minLength(4)])
    });
    this.loginform=new FormGroup({
      email : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }

  showre(){
    if(this.formGroup.get('firstname').value!="" &&  this.formGroup.get('lastname').value!="" &&this.formGroup.get('birthdate').value!="" && this.formGroup.get('email').value!="" && this.formGroup.get('password').value!="" && this.formGroup.get('confirmpassword').value!=null  && this.formGroup.get('phone').value!=0){
        this.show=1;

    }
  }

  checkpassword(){
    if(this.formGroup.get('password').value !=  this.formGroup.get('confirmpassword').value){
 this.show=0;
      this.toastr.warning('Check Your Passwords', 'Passwords Doesnt Match');
    }


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
    this.toastr.success('Successfully Registred!', 'Welcome',{
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    });
    Object.assign(this.user, this.formGroup.value);
    this.docSer.adduser(this.user).subscribe(() => this.listUsers = this.listUsers.filter(user => user.id != this.user.id),);
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }

  login(){
    this.docSer.login(this.loginform.value.email,this.loginform.value.password).subscribe((data: User[]) => this.member = data);
    this.docSer.logindoctor(this.loginform.value.email,this.loginform.value.password).subscribe((data: Doctor[]) => this.Doctor = data);
    setTimeout(() => {
      if (this.member.length!=0){
        var connecteduser = this.member[0];
        localStorage.setItem("connecteduser", JSON.stringify(connecteduser));

        this.toastr.success('Redirecting ...', 'Successfully Logged In ');
        setTimeout(() => {
        window.location.reload();
        window.location.href="http://localhost:4200/home";
        }, 2500);
      }
      else if(this.Doctor.length!=0){
        var connecteddoctor = this.Doctor[0];
        localStorage.setItem("connecteduser", JSON.stringify(connecteddoctor));
        this.toastr.success('Redirecting ...', 'Successfully Logged In ');
        setTimeout(() => {
          window.location.reload();
          window.location.href="http://localhost:4200/home";
        }, 2500);
      }
      else {
        this.toastr.error('Invalid Credentials', 'Check Your Informations');
      }
    }, 500);


  }

motdepasseoublie(){
  Email.send({
    Host : "smtp.gmail.com",
    Username : "mohamedchakib.hajji@esprit.tn",
    Password : "chekibelhajji2020",
  To : "siwar.hassen@esprit.tn",
  From : "Tunisian Health",
  Subject : "Test",
  Body : "test"
  }).then( message => {alert(message); } );
}


}
