import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../model/doctor";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  id:number;
  constructor(private httpClient: HttpClient) { }

  afficherdoctor()
  {
    return this.httpClient.get<Doctor[]>("http://localhost:3000/doctors");
  }


  afficherdoc(id)
  {
  return this.httpClient.get<Doctor>('http://localhost:3000/doctors/' + id);
  }

  listespecialite(specialite)
  {
    return this.httpClient.get<Doctor[]>('http://localhost:3000/doctors?speciality=' + specialite)
  }

  login(email,password)
  {
    return this.httpClient.get<User[]>('http://localhost:3000/users?email=' + email + "&&password=" + password)
  }

  adduser(u:User)
  {
    return this.httpClient.post("http://localhost:3000/users",u);
  }

  updateuser(id,user:User)
  {
    return this.httpClient.put("http://localhost:3000/users/"+id,user);
  }
  deleteuser(id)
  {
    return this.httpClient.delete("http://localhost:3000/users/"+id);
  }

}

