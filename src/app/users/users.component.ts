import { Component, OnInit } from '@angular/core';
import {DoctorService} from "../shared/doctor.service";
import {User} from "../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Doctor} from "../model/doctor";
import {HttpClient, HttpEventType} from "@angular/common/http";



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
  us : User;
  affichermailexiste:number;
  show:number;
  constructor(private docSer:DoctorService, private http: HttpClient, private toastr: ToastrService) { }

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
        localStorage.setItem("doctor", "NO");
        this.toastr.success('Redirecting ...', 'Successfully Logged In ');
        setTimeout(() => {
        window.location.reload();
        window.location.href="http://localhost:4200/home";
        }, 2500);
      }
      else if(this.Doctor.length!=0){
        var connecteddoctor = this.Doctor[0];
        localStorage.setItem("connecteduser", JSON.stringify(connecteddoctor));
        localStorage.setItem("doctor", "YES");
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

  sendmail(){
    if ((<HTMLInputElement>document.getElementById("mail")).value != ""){
      this.toastr.success('Mail Sent', 'We Sent An Email to recover your password');
      let r = Math.random().toString(36).substring(7).toUpperCase();
      this.motdepasseoublie(r).subscribe(
        event => {
        }
      );
      localStorage.setItem("mail", (<HTMLInputElement>document.getElementById("mail")).value);
      localStorage.setItem("code", r);
      setTimeout(() => {
      window.location.href="http://localhost:4200/updatepassword";
      }, 1500);
    }
    else{
      this.toastr.warning('Type Your Email', 'Type Your Email to recover your password');
    }


  }

  mailverification(){

    this.docSer.getuser((<HTMLInputElement>document.getElementById("email")).value).subscribe((data: User) => this.us = data);
   console.log(this.us);
    if(this.us != null){
    this.affichermailexiste=1;
  }

  }

motdepasseoublie(r){
    var inputValue = (<HTMLInputElement>document.getElementById("mail")).value;
 const url = 'http://localhost/mail.php?code='+r+'&mail='+inputValue;
  return this.http.post(url, "", {
   reportProgress: true,
   observe: 'events'
 });


}


}
