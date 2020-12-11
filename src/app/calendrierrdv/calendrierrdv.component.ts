import { Component, OnInit } from '@angular/core';
import {rdv} from "../model/rdv";
import {DoctorService} from "../shared/doctor.service";

@Component({
  selector: 'app-calendrierrdv',
  templateUrl: './calendrierrdv.component.html',
  styleUrls: ['./calendrierrdv.component.css']
})
export class CalendrierrdvComponent implements OnInit {
  listrdv: rdv[];
  dateinput:string;
  constructor(private doctorservice: DoctorService) { }

  ngOnInit(): void {
    let today = new Date().toLocaleDateString();
    var test = localStorage.getItem('connecteduser');
   let day= today[0]+today[1];
   let month = today[3]+today[4];
   let year = today[6]+today[7]+today[8]+today[9];
   let lyom = year+"-"+month+"-"+day;
    interface MyObj {
      id:string;
    }
    let obj: MyObj = JSON.parse(test);
    this.doctorservice.affichermyrdv(lyom,obj.id).subscribe((data: rdv[]) => this.listrdv = data);
  }

  affichernewrdv(){
if(this.dateinput != null){
  this.listrdv = null;
  var test = localStorage.getItem('connecteduser');
  interface MyObj {
    id:string;
  }
  let obj: MyObj = JSON.parse(test);
  this.doctorservice.affichermyrdv(this.dateinput,obj.id).subscribe((data: rdv[]) => this.listrdv = data);

}
  }

}
