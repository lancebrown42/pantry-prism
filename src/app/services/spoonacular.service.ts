import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';
import { Recipe } from '../models/recipe.model';
// import { env } from 'process';
import {Platform} from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  isCordova: boolean;
  baseUrl=(this.plat.is('cordova')?environment.mobileServer:environment.server);
  constructor(private http: HttpClient, public plat: Platform) {
    this.isCordova = plat.is('cordova');
   }

  getItemUPC(upc: string): Observable<Item>{
    return this.http.get<Item>(this.baseUrl + 'getItemUPC/' + upc);
  }
}