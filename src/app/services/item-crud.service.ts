import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from '../models/item.model';
import {Platform} from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ItemCrudService {
  isCordova: boolean;
  baseUrl=(this.plat.is('cordova')?environment.mobileServer:environment.server);
  constructor(private http: HttpClient, public plat: Platform) {
    this.isCordova = plat.is('cordova');
   }

  getAll(): Observable<Item[]>{
    return this.http.get<Item[]>(this.baseUrl + 'items');
  }
  addBatch(items: Item[]): Observable<any>{
    return this.http.post(this.baseUrl + 'addItemBatch',items);
  }
}
