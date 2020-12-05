import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Doctor} from "../model/doctor";
import {User} from "../model/user";
import {commentaire} from "../model/commentaire";


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

  affichercommentaire(id)
  {
    return this.httpClient.get<commentaire[]>("http://localhost:3000/commentaire?id_doctor="+id);
  }

  rechercherdocteur(searchinput)
  {
    return this.httpClient.get<Doctor[]>('http://localhost:3000/doctors/?q=' + searchinput);
  }

  afficherdoc(id)
  {
  return this.httpClient.get<Doctor>('http://localhost:3000/doctors/' + id);
  }

  listespecialite(specialite,id)
  {
    return this.httpClient.get<Doctor[]>('http://localhost:3000/doctors?speciality=' + specialite+"&&id_ne="+id)
  }

  login(email,password)
  {
    return this.httpClient.get<User[]>('http://localhost:3000/users?email=' + email + "&&password=" + password)
  }

  adduser(u:User)
  {
    return this.httpClient.post("http://localhost:3000/users",u);
  }

  addcommentaire(c:commentaire)
  {
    return this.httpClient.post("http://localhost:3000/commentaire",c);
  }

  updateuser(id,user:User)
  {
    return this.httpClient.put("http://localhost:3000/users/"+id,user);
  }
  deleteuser(id)
  {
    return this.httpClient.delete("http://localhost:3000/users/"+id);
  }

  deletecommentaire(id){
    return this.httpClient.delete("http://localhost:3000/commentaire/"+id);
  }


}

