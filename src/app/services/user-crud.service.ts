import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../models/user.model';

const baseUrl='http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl+'users');
  }
  getOne(id: number): Observable<User[]>{
    return this.http.get<User[]>(baseUrl + 'userId/' + id);
  }
  register(user: User): Observable<any>{
    return this.http.post(baseUrl+ 'users', user);
  }
}
