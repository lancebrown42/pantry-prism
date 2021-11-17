import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from '../models/item.model';

const baseUrl='http://localhost:3000/api/';
@Injectable({
  providedIn: 'root'
})
export class ItemCrudService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]>{
    return this.http.get<Item[]>(baseUrl + 'items');
  }
}
