import { Component, OnInit } from '@angular/core';
import {Doctor} from "../model/doctor";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../shared/doctor.service";
import {commentaire} from "../model/commentaire";
import {User} from "../model/user";
import {Timestamp} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']

})
export class DoctorComponent implements OnInit {

  doctor:Doctor;
 nombr:number;
  showform:number;
 commentaire: commentaire[];
 comm:commentaire;
 commentaireinput:string;
 user:User[];
  connecteduser: User;
  cnt:number;
  constructor(private service: ActivatedRoute , private docSer:DoctorService) { }

  ngOnInit(): void {
    this.showform=0;
      this.docSer.afficherdoc(this.service.snapshot.params.id).subscribe((data: Doctor) => this.doctor = data);
    this.docSer.affichercommentaire(this.service.snapshot.params.id).subscribe((data: commentaire[]) => this.commentaire = data);
    this.connecteduser = JSON.parse(localStorage.getItem("connecteduser"));
    if ((typeof this.connecteduser !== 'undefined' && this.connecteduser !== null)) {
      this.cnt = 1;
      }
     else {
      this.cnt = 0;
    }
  }

  nombre(nomb:number){
    this.nombr=nomb;
  }

  clickrdv(){
    this.showform=1;
  }

  hideform(){
    this.showform=0;
  }

  addcomment(e) {
    if (e.keyCode == 13) {
      this.comm = new commentaire();
      this.comm.user= JSON.parse(localStorage.getItem('connecteduser'));
      var d = new Date();
      var time =d.getHours()+":"+d.getMinutes();
      this.comm.time=time;
      let today = new Date().toLocaleDateString();
      this.comm.date=today;
      this.comm.commentaire=this.commentaireinput;
      this.comm.id_doctor=this.service.snapshot.params.id;
      this.docSer.addcommentaire(this.comm).subscribe( (e: commentaire) =>
      {
        this.commentaireinput="";
        this.commentaire.push(e);

      });
   }
    }

  deletecomme(id){
    this.docSer.deletecommentaire(id).subscribe(
      () => this.commentaire = this.commentaire.filter(comm => comm.id != id),
    );
  }

}
