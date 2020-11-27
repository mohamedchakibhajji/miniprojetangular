import { Component, OnInit } from '@angular/core';
import {Doctor} from "../model/doctor";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../shared/doctor.service";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
 doctor:Doctor;
  constructor(private service: ActivatedRoute , private docSer:DoctorService) { }

  ngOnInit(): void {
      this.docSer.afficherdoc(this.service.snapshot.params.id).subscribe((data: Doctor) => this.doctor = data);

  }

}
