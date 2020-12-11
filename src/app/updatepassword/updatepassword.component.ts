import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {DoctorService} from "../shared/doctor.service";
import {User} from "../model/user";

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
codeinput:string;
show:number;
passwordinput:string;
  showconfirm:number;
  user:User;
confirmpasswordinput:string;
  constructor( private toastr: ToastrService,private docSer:DoctorService) { }

  ngOnInit(): void {
  }

  checkcode(){
    var test = localStorage.getItem('code');
    if(this.codeinput.length==6){
if(test == this.codeinput){

  this.show=1;
}else{
  this.toastr.error('Code Incorrect', 'Verify the code');
}

    }
  }

  confirmpassword(){
    if(this.passwordinput == this.confirmpasswordinput){
        this.showconfirm = 1 ;
      }
  }

  updatepassword() {
      if (this.passwordinput == this.confirmpasswordinput) {
        var test = localStorage.getItem('mail');
        this.docSer.getuser(test).subscribe((data: User) => this.user = data);
        setTimeout(() => {
          console.log(this.user[0]);
          this.user[0].password = this.passwordinput;
          this.docSer.updatpaseuser(this.user[0].id, this.user[0]).subscribe((data: User) => this.user = data);;
       window.location.href = "http://localhost:4200/adduser";
        }, 500);
      }

    else {
      this.toastr.warning('Passwords D"oesnt Match', 'Check Your Password');
    }

  }
}
