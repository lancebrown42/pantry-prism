import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
