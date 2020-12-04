import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Doctor} from "../model/doctor";
import {DoctorService} from "../shared/doctor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-samespeciality',
  templateUrl: './samespeciality.component.html',
  styleUrls: ['./samespeciality.component.css']
})
export class SamespecialityComponent implements OnInit {
  @Input() doctor:Doctor;
  @Output() numberdoc = new EventEmitter<number>();
  listmemespecialite: Doctor[];
  constructor(private docSer:DoctorService,private service: ActivatedRoute ,) { }

  ngOnInit(): void {
    this.docSer.listespecialite(this.doctor.speciality,this.service.snapshot.params.id).subscribe((data: Doctor[]) => this.listmemespecialite = data);
    setTimeout(() => {
      this.numberdoc.emit(this.listmemespecialite.length);
    }, 500);

  }

  redirect(){

      window.location.reload();


  }
}
