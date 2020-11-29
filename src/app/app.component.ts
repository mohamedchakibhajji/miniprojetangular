import {Component, OnInit} from '@angular/core';
import {User} from "./model/user";
import {FormGroup} from "@angular/forms";
import {DoctorService} from "./shared/doctor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet';
  storeduser: Array<any>;
  id: string;
  cnt: number;
  member:User[];
  constructor(private docSer:DoctorService) { }
  ngOnInit() {
    this.storeduser = JSON.parse(localStorage.getItem("connecteduser"));
    if ((typeof this.storeduser !== 'undefined' && this.storeduser !== null)) {
      this.id = Object.keys(this.storeduser)[0];
      if (this.id == "id") {
        this.cnt = 1;
      } else {
        this.cnt = 0;
      }
    } else {
      this.cnt = 0;
    }

  }

  sessiondestroy() {
    localStorage.clear();
    window.location.reload();
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
    window.location.href="http://localhost:4200/home";
  }

}

