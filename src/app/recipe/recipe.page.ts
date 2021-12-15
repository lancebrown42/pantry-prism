import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { PopoverController } from '@ionic/angular';
import { SpoonacularService } from '../services/spoonacular.service';
import { AutocompletePopoverComponent } from 'src/app/autocomplete-popover/autocomplete-popover.component';
import { ItemCrudService } from '../services/item-crud.service';
import { User } from '../models/user.model';
import { Item } from '../models/item.model';
import { RecipeInfo } from '../models/recipe-info.model';




@Component({
  selector: 'app-recipe',
  templateUrl: 'recipe.page.html',
  styleUrls: ['recipe.page.scss']
})
export class RecipePage implements OnInit {
  @Input() name: string;
  recipes: Recipe[] = [];
  user: User;
  public searchField: FormControl;
  public recipeList$: Observable<Recipe[]>;
  popOpen: boolean;
  source: JSON ;
  inventory: Item[] = [];
  popover: HTMLIonPopoverElement;
  recipePopulated = false;
  show: number[]=[];
  constructor(
    public popoverController: PopoverController,
    private modalCtr: ModalController,
    private spoonApi: SpoonacularService,
    public itemService: ItemCrudService,
  ) {
    this.searchField = new FormControl('');
  }

  ngOnInit() {
    console.log('init');
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField),
      distinctUntilChanged(),
    );
    searchTerm$.subscribe(async search=>{
      console.log(search);
      // this.recipeList$ = this.spoonApi.getRecipeSuggestion(search, 5);
      if(this.popover){
        console.log('POPOVER ALREADY OPEN');
        await this.popover.dismiss();
        // await this.popover.onDidDismiss();
      }
      this.presentPopover(await searchTerm$);
    });
    // this.recipes.push(new Recipe());
    const recipeList$ = new Observable<Recipe[]>();

  }
  async ionViewWillEnter(){
    this.populateInventory();
    console.log('enter');
    this.inventory = [];
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log('this.inventory');
    console.log(this.inventory);

  }
  async populateInventory(){
    console.log('enter popInv');
    if(this.user){
      console.log('user: ');
      console.log(this.user);
      await this.itemService.getAllUser(this.user)
      .subscribe(
        data=>{
          this.source = JSON.parse(JSON.stringify(data));
          console.log(this.source);
          const items = JSON.parse(JSON.stringify(this.source)).Items;
          for(const item of items){
            console.log(item);
            // console.log('item');
            // console.log(item);
            const it = item;
            // console.log('it');
            // console.log(it);
            this.inventory.push(it);
          }
          console.log('leaving popinv user');
          if(!this.recipePopulated){
            this.populateRecipes('populateInventoryUser');
          }
        }
        );
      }else{
        console.log('nouser');

        this.itemService.getAll()
        .subscribe(
          data=>{
            this.source = JSON.parse(JSON.stringify(data));
            // console.log(this.source);
            for(const item of JSON.parse(JSON.stringify(this.source))){
              // console.log(item);
              // console.log('item');
              // console.log(item);
              const it = item;
              // console.log('it');
              // console.log(it);
              this.inventory.push(it);
            }
            console.log('leaving popinv nouser');

          }
          );
          // await this.randomRecipes();
        }
  }
  async populateRecipes(caller: string){
    console.log('populate recipe caller: ', caller);
    this.spoonApi.getRecipeByIngredients(this.inventory).subscribe((rec)=>{
      console.log('rec');
      console.log(rec);
      this.recipes = [];
      const re = rec.recipe;
      for(const r of rec){
        console.log('r');
        console.log(r);
        this.recipes.push(r.recipe);
        this.recipePopulated = true;
      }
      });
  }
  async randomRecipes(){
    this.spoonApi.getRecipeRandom().subscribe((rec)=>{
      console.log('rec');
      console.log(rec);
      const re = rec;
      for(const r of rec){
        console.log('r');
        console.log(r);
        this.recipes.push(r);
      }
      });
  }
  async close() {

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
    if(this.searchField.value){

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
  }
  async expandRecipe(ev: any, recipe: Recipe, index: number){
    let details: RecipeInfo = recipe.jsonRecipeData;
    // console.log(ev.currentTarget);
    console.log(recipe);
    // console.log(index);
    // console.log(details);
    this.spoonApi.getRecipeByID(recipe.intSpoonacularId).subscribe((rec)=>{
      console.log(rec);
      details = rec.jsonRecipeData;
      // const image = recipe.jsonRecipeData.image;
      // recipe.jsonRecipeData = null;
      recipe.jsonRecipeData = JSON.parse(JSON.stringify(details));
      console.log(recipe);
      this.show.push(index);
      // console.log(recipe.jsonRecipeData.image);
      // recipe.jsonRecipeData.image = image;

    });
  }


}
