import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { PopoverController } from '@ionic/angular';
import { SpoonacularService } from '../services/spoonacular.service';
import { AutocompletePopoverComponent } from 'src/app/autocomplete-popover/autocomplete-popover.component';




@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss']
})
export class RecipePage implements OnInit {
  @Input() name: string;
  recipes: Recipe[];
  public searchField: FormControl;
  public recipeList$: Observable<Recipe[]>;
  popOpen: boolean;
  popover: HTMLIonPopoverElement;
  constructor(
    public popoverController: PopoverController,
    private modalCtr: ModalController,
    private spoonApi: SpoonacularService,
  ) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField)
    );
    this.recipes = [];
    // this.recipes.push(new Recipe());
    const recipeList$ = new Observable<Recipe[]>();
    this.searchField.valueChanges.subscribe(async search=>{
      console.log(search);
      // this.recipeList$ = this.spoonApi.getRecipeSuggestion(search, 5);
      if(this.popover){
        console.log('POPOVER ALREADY OPEN');
        await this.popover.dismiss();
        // await this.popover.onDidDismiss();
      }
      this.presentPopover(searchTerm$);
    });
    // this.recipeList$ = combineLatest([recipeList$, searchTerm$]).pipe(
    //   map(([recipeList, searchTerm])=>
    //   recipeList.filter(
    //     (recipe)=>
    //       searchTerm === '' ||
    //       recipe.strDescription.toLowerCase().includes(searchTerm.toLowerCase())
    //   ))
    // );
  }

  async close() {
    // const closeModal = 'Modal Closed';
    console.log(this.searchField.value);
    await this.modalCtr.dismiss(this.recipes);
  }
  async presentPopover(ev: any) {
    this.popover = await this.popoverController.create({
      component: AutocompletePopoverComponent,
      cssClass: 'searchbarAutocomplete',
      event: ev,
      translucent: false,
      showBackdrop: false,
      // backdropDismiss: false,
      keyboardClose: false,
      componentProps: {search: this.searchField.value, source: 'recipe'},
    });
    this.popOpen = true;
    await this.popover.present();
    const { role, data } = await this.popover.onDidDismiss();
    this.popOpen = false;
    console.log('onDidDismiss resolved with role', role, '\n returning data', data);
    if(data){
      this.recipes.push(data);
      this.searchField.setValue(null);
    }
  }

//   recipeAutoComplete: FormControl[] = [new FormControl()];
//   recipeAutoComplete$: Observable<RecipeAutocomplete[]>;
//   loading = false;
//   searchInput: RecipeAutocomplete;
//   spinnerColor: ThemePalette = 'primary';
//   isInitial = true;
//   recipe$: Observable<RecipeInfo> = this.store.recipeInfoObs;
//   recipes: any[] = [{id: 1, title: 'test'}];

//   /******
//    * test stuff
//    */
//    searchMoviesCtrl = new FormControl();
//    filteredMovies: any;
//    isLoading = false;
//    errorMsg: string;
//    /****/

//   constructor(
//     private recipeService: RecipeService,
//     private store: StoreService,
//     private http: HttpClient
//   ) {}

//   ngOnInit(): void {
//     this.onRecipeAutoCompleteValueChange();


//     this.searchMoviesCtrl.valueChanges
//          .pipe(
//             debounceTime(500),
//             tap(() => {
//                this.errorMsg = '';
//                this.filteredMovies = [];
//                this.isLoading = true;
//             }),
//             switchMap(value => this.http.get('http://www.omdbapi.com/?apikey=[YOUR_KEY_HERE]=' + value)
//                .pipe(
//                   finalize(() => {
//                      this.isLoading = false;
//                   }),
//                )
//             )
//          )
//          .subscribe(data => {
//             if (data['Search'] == undefined) {
//                this.errorMsg = data['Error'];
//                this.filteredMovies = [];
//             } else {
//                this.errorMsg = '';
//                this.filteredMovies = data['Search'];
//             }

//             console.log(this.filteredMovies);
//          });
//   }

//   recipeDisplayValue(recipe: RecipeAutocomplete): string {
//     return recipe && recipe.title;
//   }
//   showIngredients(ingredients: Ingredient[]): string {
//     return ingredients.reduce(
//       (prev, curr) => `${prev ? prev + ', ' : ''}${curr.name}`,
//       ''
//     );
//   }
//   onRecipeSelect(selectedEvent: MatAutocompleteSelectedEvent): void {
//     const selectedRecipe: RecipeAutocomplete = selectedEvent.option.value;
//     this.isInitial = false;
//     this.getRecipeInfo(selectedRecipe.id);
//   }
// // eslint-disable-next-line @typescript-eslint/member-delimiter-style
// searchBoxRecipes(event?: {component: IonicSelectableComponent,text: string}) {
//     const text = event.text.trim().toLowerCase();
//     event.component.startSearch();
//     if(!text){
//       return;
//     }
//     this.recipeAutoComplete$ = this.recipeService.getRecipeAutoComplete(text);
//     this.recipeAutoComplete$.subscribe((recipe)=>{event.component.recipes.push(recipe);});
//     event.component.endSearch();
// }
//   private onRecipeAutoCompleteValueChange(): void {
//     // this.recipeAutoComplete$ = this.searchRecipes(this.searchInput.title).pipe(finalize(() => (this.loading = false)));
//   }


//   private searchRecipes(query: string): Observable<RecipeAutocomplete[]> {
//           return this.recipeService.getRecipeAutoComplete(query);
//     }


//   private getRecipeInfo(recipeId: number): void {
//     this.recipeService
//       .getRecipeInfo(recipeId)
//       .subscribe((recipeInfo) => this.store.updateRecipeInfo(recipeInfo));
//   }


  // private onViewPortChange(): void {
  //   this.breakPointObserver
  //     .observe([Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
  //     .subscribe((result) => {
  //       if (result.breakpoints[Breakpoints.Large]) {
  //         this.searchBarRecipesAlignment = searchBarAlignmentPosition.row;
  //       }

  //       if (result.breakpoints[Breakpoints.Medium]) {
  //         this.searchBarRecipesAlignment = searchBarAlignmentPosition.column;
  //       }

  //       if (result.breakpoints[Breakpoints.Small]) {
  //         this.searchBarRecipesAlignment = searchBarAlignmentPosition.column;
  //       }
  //     });
  // }

}
