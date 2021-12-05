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
  constructor(public popoverControl: PopoverController, private spoonApi: SpoonacularService, private itemCtrl: ItemCrudService) { }
  ngOnInit() {
    console.log(this.search);
    // this.results$ = this.spoonApi.getItemSuggestion(this.search);
    this.results$=this.itemCtrl.getAll();

    const handler=this.results$.subscribe(results=>{
      for(const res of results.values()){
        this.results.push(res);
        // console.log(res.strDescription);
      }
      console.log(this.results);
    });
  }
  async selected(ev: Event){
    console.log(ev);
    await this.popoverControl.dismiss();
  }


}
