import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user.model';
import {Platform} from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  isCordova: boolean;
  baseUrl=(this.plat.is('cordova')?environment.mobileServer:environment.server);
  constructor(private http: HttpClient, public plat: Platform) {
    this.isCordova = plat.is('cordova');
   }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'users');
  }
  getOne(id: number): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + 'userId/' + id);
  }
  getByCredentials(email: string, pass: string): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'userCreds/'+ email + '/' + pass);
  }
  register(user: User): Observable<any>{
    return this.http.post(this.baseUrl+ 'users', user);
  }
}
