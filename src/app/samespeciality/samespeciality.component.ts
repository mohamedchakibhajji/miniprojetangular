import {Component, Input, OnInit} from '@angular/core';
import {Doctor} from "../model/doctor";
import {DoctorService} from "../shared/doctor.service";

@Component({
  selector: 'app-samespeciality',
  templateUrl: './samespeciality.component.html',
  styleUrls: ['./samespeciality.component.css']
})
export class SamespecialityComponent implements OnInit {
  @Input() doctor:Doctor;
  listmemespecialite: Doctor[];
  constructor(private docSer:DoctorService) { }

  ngOnInit(): void {
    this.docSer.listespecialite(this.doctor.speciality).subscribe((data: Doctor[]) => this.listmemespecialite = data);
  }

}
