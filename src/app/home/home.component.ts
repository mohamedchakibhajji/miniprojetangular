import { Component, OnInit } from '@angular/core';
import {Doctor} from "../model/doctor";
import {DoctorService} from "../shared/doctor.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listDoctors: Doctor[];
  constructor(private doctorservice: DoctorService) { }

  ngOnInit(): void {
    this.doctorservice.afficherdoctor().subscribe((data: Doctor[]) => this.listDoctors = data);
  }
}
