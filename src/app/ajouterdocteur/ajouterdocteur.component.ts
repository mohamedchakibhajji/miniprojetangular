import {Component, OnInit, RendererFactory2, ViewChild} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {Doctor} from "../model/doctor";
import {DoctorService} from "../shared/doctor.service";
import {ToastrService} from "ngx-toastr";
import {Address} from "../model/address";

@Component({
  selector: 'app-ajouterdocteur',
  templateUrl: './ajouterdocteur.component.html',
  styleUrls: ['./ajouterdocteur.component.css']
})
export class AjouterdocteurComponent implements OnInit {
   Doctor: Doctor;
  address: Address;
  Doctors: Doctor[];
  @ViewChild('File') InputFile;
  UploadFile: File;
  UploadProgress:number;
  constructor(private docSer:DoctorService, private toastr: ToastrService, private http: HttpClient,private fb: FormBuilder,private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.Doctor = new Doctor();
    this.address = new Address();
  }

  upload(){
   // setTimeout(() => {
     // window.location.reload();
    //}, 3500);
    const file = this.InputFile.nativeElement;
    if (file.files && file.files[0]) {
      this.UploadFile = file.files[0];
    }
    const formData = new FormData();
  this.Doctor.picture = this.UploadFile.name;
  this.docSer.adddoctor(this.Doctor).subscribe(() => this.Doctors = this.Doctors.filter(doctor => doctor.id != this.Doctor.id),);

    formData.append('file', this.UploadFile);
    this.uploadFile(formData).subscribe(
      event => {
        if(event.type === HttpEventType.UploadProgress){
          this.UploadProgress = Math.round((event.loaded / event.total) * 100);
          console.log(this.UploadProgress);

        } else if(event.type === HttpEventType.Response) {
          let response: any;
          response = event.body;
          console.log("res"+response);
        }
      }
    );

  }

  uploadFile(formData){
    const url = 'http://localhost/upload.php';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
