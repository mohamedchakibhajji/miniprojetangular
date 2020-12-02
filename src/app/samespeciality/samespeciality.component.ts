import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from "../model/doctor";
import {DoctorService} from "../shared/doctor.service";

@Component({
  selector: 'app-samespeciality',
  templateUrl: './samespeciality.component.html',
  styleUrls: ['./samespeciality.component.css']
})
export class SamespecialityComponent implements OnInit {
  @Input() doctor:Doctor;
  @Output() numberdoc = new EventEmitter<number>();
  listmemespecialite: Doctor[];
  constructor(private docSer:DoctorService) { }

  ngOnInit(): void {
    this.docSer.listespecialite(this.doctor.speciality).subscribe((data: Doctor[]) => this.listmemespecialite = data);
    setTimeout(() => {
      this.numberdoc.emit(this.listmemespecialite.length-1);
    }, 500);

  }

}
