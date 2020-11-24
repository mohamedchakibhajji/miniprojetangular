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
  constructor(private doctorservice: DoctorService) { }

  ngOnInit(): void {
    this.doctorservice.afficherdoctor().subscribe((data: Doctor[]) => this.listDoctors = data);
  }
}
