/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { RecipeInfo } from '../models/recipe-info.model';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class StoreService {
  constructor() {}

  private recipeInfoSub: Subject<RecipeInfo> = new Subject<RecipeInfo>();

  recipeInfoObs: Observable<RecipeInfo> = this.recipeInfoSub.asObservable();

  updateRecipeInfo(recipeInfo: RecipeInfo) {
    this.recipeInfoSub.next(recipeInfo);
  }
}
