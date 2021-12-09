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
  getItemName(name: string, numResults?: number): Observable<Item[]>{
    return this.http.get<Item[]>(this.baseUrl + 'getItemName/' + name + '/' + (numResults ? numResults : 1));
  }
  getItemSuggestion(name: string, numResults?: number): Observable<Item[]>{
    return this.http.get<Item[]>(this.baseUrl + 'getItemSuggest/' + name + '/' + (numResults ? numResults : 1));

  }
  getProductSuggestion(name: string, numResults?: number): Observable<Item[]>{
    return this.http.get<Item[]>(this.baseUrl + 'getProductSuggest/' + name + '/' + (numResults ? numResults : 1));

  }
  getItemByID(id: number): Observable<Item>{
    return this.http.get<Item>(this.baseUrl + 'getItemId/' + id);

  }
  getRecipeByID(id: number): Observable<Recipe>{
    return this.http.get<Recipe>(this.baseUrl + 'getRecipeInfo/' + id);
  }
  getRecipeByIngredients(ingredient: Item[], numResults?: number, ignorePantry?: boolean): Observable<any>{
    return this.http.post<any>(this.baseUrl + 'getRecipeByIngredients/', {ingredients: ingredient, num: numResults, ignore: ignorePantry});
  }

  getRecipeAutocomplete(query: string, numResults?: number): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes/autocomplete/' + query + '/' + (numResults ?? 1));
  }

  getRecipeRandom(tags?: string, numResults?: number): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.baseUrl + 'recipes/random/' + (numResults ?? '5') + '/' + (tags ?? ''));

  }
}
