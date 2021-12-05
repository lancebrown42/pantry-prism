
import { Component, OnInit } from '@angular/core';
import { FormControl, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { RecipeAutocomplete } from '../models/recipe-autocomplete.model';
import { Observable } from 'rxjs';
import { ThemePalette } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipeService } from '../services/recipe.service';
import { RecipeInfo, Ingredient } from '../models/recipe-info.model';
import { StoreService } from '../services/store.service';
import { IonicSelectableComponent } from '@ionic-selectable/angular';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  finalize,
} from 'rxjs/operators';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recipeAutoComplete: FormControl = new FormControl();
  recipeAutoComplete$: Observable<RecipeAutocomplete[]>;
  loading = false;
  searchInput: RecipeAutocomplete;
  spinnerColor: ThemePalette = 'primary';
  isInitial = true;
  recipe$: Observable<RecipeInfo> = this.store.recipeInfoObs;
  recipes: any[] = [{id: 1, title: 'test'}];


  constructor(
    private recipeService: RecipeService,
    private store: StoreService,
  ) {}

  ngOnInit(): void {
    this.onRecipeAutoCompleteValueChange();
  }

  recipeDisplayValue(recipe: RecipeAutocomplete): string {
    return recipe && recipe.title;
  }
  showIngredients(ingredients: Ingredient[]): string {
    return ingredients.reduce(
      (prev, curr) => `${prev ? prev + ', ' : ''}${curr.name}`,
      ''
    );
  }
  onRecipeSelect(selectedEvent: MatAutocompleteSelectedEvent): void {
    const selectedRecipe: RecipeAutocomplete = selectedEvent.option.value;
    this.isInitial = false;
    this.getRecipeInfo(selectedRecipe.id);
  }
// eslint-disable-next-line @typescript-eslint/member-delimiter-style
searchBoxRecipes(event?: {component: IonicSelectableComponent,text: string}) {
    const text = event.text.trim().toLowerCase();
    event.component.startSearch();
    if(!text){
      return;
    }
    this.recipeAutoComplete$ = this.recipeService.getRecipeAutoComplete(text);
    this.recipeAutoComplete$.subscribe((recipe)=>{event.component.items.push(recipe);});
    event.component.endSearch();
}
  private onRecipeAutoCompleteValueChange(): void {
    // this.recipeAutoComplete$ = this.searchRecipes(this.searchInput.title).pipe(finalize(() => (this.loading = false)));
  }


  private searchRecipes(query: string): Observable<RecipeAutocomplete[]> {
          return this.recipeService.getRecipeAutoComplete(query);
    }


  private getRecipeInfo(recipeId: number): void {
    this.recipeService
      .getRecipeInfo(recipeId)
      .subscribe((recipeInfo) => this.store.updateRecipeInfo(recipeInfo));
  }


  // private onViewPortChange(): void {
  //   this.breakPointObserver
  //     .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
  //     .subscribe((result) => {
  //       if (result.breakpoints[Breakpoints.Large]) {
  //         this.searchBarItemsAlignment = searchBarAlignmentPosition.row;
  //       }

  //       if (result.breakpoints[Breakpoints.Medium]) {
  //         this.searchBarItemsAlignment = searchBarAlignmentPosition.column;
  //       }

  //       if (result.breakpoints[Breakpoints.Small]) {
  //         this.searchBarItemsAlignment = searchBarAlignmentPosition.column;
  //       }
  //     });
  // }

}
