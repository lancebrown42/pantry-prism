import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from '../models/item.model';
import { Recipe } from '../models/recipe.model';
import {Platform} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeCrudService {
  isCordova: boolean;
  baseUrl=(this.plat.is('cordova')?environment.mobileServer:environment.server);
  constructor(private http: HttpClient, public plat: Platform) {
    this.isCordova = plat.is('cordova');
   }

  getAll(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes');
  }
  addBatch(items: Recipe[]): Observable<any>{
    return this.http.post(this.baseUrl + 'addItemBatch',items);
  }
  getAllUser(user: User): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.baseUrl + 'userRecipes/' + user.intUserId);
  }
}
