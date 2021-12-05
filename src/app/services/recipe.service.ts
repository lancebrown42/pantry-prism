import { Injectable } from '@angular/core';
import { RecipeInfo } from '../models/recipe-info.model';
import { of, Observable } from 'rxjs';
import { RecipeAutocomplete } from '../models/recipe-autocomplete.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeService {
  private readonly api: string = environment.server;

  constructor(private httpClient: HttpClient) {}

  getRecipeAutoComplete(
    query: string,
    records: number = 1
  ): Observable<RecipeAutocomplete[]> {
    return this.httpClient
      .get<RecipeAutocomplete[]>(
        `${this.api}recipes/autocomplete/${query}/${records}`
      )
      .pipe(catchError(() => of([])));
  }

  getRecipeInfo(recipeId: number): Observable<RecipeInfo> {
    return this.httpClient
      .get<RecipeInfo>(`${this.api}recipes/${recipeId}/information`)
      .pipe(catchError(() => of({} as RecipeInfo)));
  }
}
