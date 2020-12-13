import {Component, OnInit, ViewChild} from '@angular/core';

import {User} from "./model/user";
import {DoctorService} from "./shared/doctor.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet';
  storeduser: Array<any>;
  doctor:string;
  id: string;
  cnt: number;
  doctorcnt:number;
  firstname:string;
  member:User[];

  constructor(private docSer:DoctorService ) { }

  ngOnInit() {

    this.storeduser = JSON.parse(localStorage.getItem("connecteduser"));
    if ((typeof this.storeduser !== 'undefined' && this.storeduser !== null)) {
      this.doctor =localStorage.getItem("doctor");
      if(this.doctor == "YES"){
        this.doctorcnt=1;
      }
      else{
        this.doctorcnt=0;
      }
        this.cnt = 1;
      var test = localStorage.getItem('connecteduser');
      interface us {
        name:string;
        firstname:string;
      }
      let obj: us = JSON.parse(test);
      if(this.doctor == "YES"){
        this.doctorcnt=1;
        this.firstname="Dr " +obj.name;
      }
      else{
        this.doctorcnt=0;
        this.firstname=obj.firstname;
      }

      } else {
        this.cnt = 0;
      }
  }

  sessiondestroy() {
    localStorage.clear();
    window.location.reload();
    window.location.href="http://127.0.0.1:4200/home";
  }



  deleteaccount() {
    var test = localStorage.getItem('connecteduser');
    interface MyObj {
      id:number;
    }
    let obj: MyObj = JSON.parse(test);
    this.docSer.deleteuser(obj.id).subscribe((data: User[]) => this.member = data);
    localStorage.clear();
    window.location.reload();
    window.location.href="http://127.0.0.1:4200/home";
  }

}

