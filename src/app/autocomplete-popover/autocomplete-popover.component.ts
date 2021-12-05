import { Component, OnInit, Input } from '@angular/core';
import{PopoverController} from '@ionic/angular';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { SpoonacularService } from '../services/spoonacular.service';
import { ItemCrudService } from '../services/item-crud.service';


@Component({
  selector: 'app-autocomplete-popover',
  templateUrl: './autocomplete-popover.component.html',
  styleUrls: ['./autocomplete-popover.component.scss'],
})
export class AutocompletePopoverComponent implements OnInit {
  @Input() search: any;

  results$: Observable<Item[]>;
  results: Item[] = [];
  maxRes = 1;
  maxResArr = [];
  constructor(public popoverControl: PopoverController, private spoonApi: SpoonacularService, private itemCtrl: ItemCrudService) { }
  ngOnInit() {
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
  }
  async selected(selection: Item){
    console.log(selection);
    // console.log(selection.id);
    // ev.target
    await this.popoverControl.dismiss(selection);
  }


}
