import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../model/doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  constructor(private httpClient: HttpClient) { }

  afficherdoctor()
  {
    return this.httpClient.get<Doctor[]>("http://localhost:3000/doctors");
  }

  afficherdoc(id)
  {
  return this.httpClient.get<Doctor>('http://localhost:3000/doctors/' + id);
  }

}
