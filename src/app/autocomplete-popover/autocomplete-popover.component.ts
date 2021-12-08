import { Component, OnInit, Input } from '@angular/core';
import{PopoverController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { SpoonacularService } from '../services/spoonacular.service';
import { ItemCrudService } from '../services/item-crud.service';
import { RecipeCrudService } from '../services/recipe-crud.service';
import { Recipe } from '../models/recipe.model';


@Component({
  selector: 'app-autocomplete-popover',
  templateUrl: './autocomplete-popover.component.html',
  styleUrls: ['./autocomplete-popover.component.scss'],
})
export class AutocompletePopoverComponent implements OnInit {
  @Input() search: any;
  @Input() source: string;
  state: string;
  results$: Observable<any[]>;
  results: Item[] = [];
  maxRes = 5;
  maxResArr = [];
  constructor(public popoverControl: PopoverController, private spoonApi: SpoonacularService,
    private itemCtrl: ItemCrudService, private recipeCtrl: RecipeCrudService) { }
  ngOnInit() {
    this.state = this.source;
    if(this.state === 'item-add'){

      for(let i=0; i<this.maxRes; i++){
        this.maxResArr.push(i);
      }
      console.log(this.search);
      this.results$ = this.spoonApi.getItemSuggestion(this.search, this.maxRes);
      // this.results$=this.itemCtrl.getAll();
      const handler=this.results$.subscribe(results=>{
        for(const res of results.values()){
          this.results.push(res);
          // console.log(res.strDescription);
        }
        console.log(this.results);
      });
    } else if(this.state === 'recipe'){
      for(let i=0; i<this.maxRes; i++){
        this.maxResArr.push(i);
      }
      console.log(this.search);
      this.results$ = this.spoonApi.getRecipeAutocomplete(this.search, this.maxRes);
      // this.results$=this.itemCtrl.getAll();
      const handler=this.results$.subscribe(results=>{
        console.log(results);
        for(const res of results.values()){
          this.results.push(res);
          // console.log(res.strDescription);
        }
        console.log(this.results);
      });
    }
  }
  async selected(selection: any/*item?: Item, recipe?: Recipe*/){
    // let selection;
    // if(item){
    //   selection = item;
    // }else if(recipe){
    //   selection = recipe;
    // }
    console.log(selection);
    // console.log(selection.id);
    // ev.target
    await this.popoverControl.dismiss(selection);
  }


}
