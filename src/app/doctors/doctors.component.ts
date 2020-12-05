import {Component, Input, OnInit} from '@angular/core';
import {Doctor} from "../model/doctor";
import {DoctorService} from "../shared/doctor.service";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  listDoctors: Doctor[];
  searchinput:string;
  constructor(private doctorservice: DoctorService) { }

  ngOnInit(): void {
    this.doctorservice.afficherdoctor().subscribe((data: Doctor[]) => this.listDoctors = data);
  }

  search(){
    this.listDoctors=null;
    this.doctorservice.rechercherdocteur(this.searchinput.valueOf()).subscribe((data: Doctor[]) => this.listDoctors = data);
  }
}
