import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from '../models/item.model';
import {Platform} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';



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
  addBatch(items: Item[], user: User): Observable<any>{
    console.log(items);
    console.log(user);
    const bdy = {user, items};
    console.log(bdy);
    // console.log(this.http.post(this.baseUrl + 'health', body).subscribe());
    return this.http.post(this.baseUrl + 'addItemBatch', bdy);
  }
  getAllUser(user: User): Observable<Item[]>{
    return this.http.get<Item[]>(this.baseUrl + 'userItems/' + user.intUserId);
  }
  addGrocery(user: User, items: Item[]): Observable<any>{
    return this.http.post(this.baseUrl + 'grocery/', {user, items});
  }
  getGrocery(user: User): Observable<any[]>{
    console.log('getGrocery');
    console.log(user.intUserId);
    return this.http.get<any[]>(this.baseUrl + 'grocery/' + user.intUserId);
  }
  updateQty(item: Item, user: User, qty: number): Observable<any>{
    // console.log('update: ' + item + user + qty);
    return this.http.put<any>(this.baseUrl + 'items/', {item, user, qty});
  }
}
