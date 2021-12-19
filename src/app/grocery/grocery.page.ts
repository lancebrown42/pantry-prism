/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/models/item.model';
import { PopoverController } from '@ionic/angular';
import { SpoonacularService } from '../services/spoonacular.service';
import { AutocompletePopoverComponent } from 'src/app/autocomplete-popover/autocomplete-popover.component';
import { ItemCrudService } from '../services/item-crud.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-grocery',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage implements OnInit{
  @Input() name: string;
  user: User = JSON.parse(sessionStorage.getItem('user'));
  items: Item[];
  public searchField: FormControl;
  public itemList$: Observable<{Items: Item[]; dtmDate: Date; intGroceryId: number; strStatus: string}[]>;
  popOpen: boolean;
  popover: HTMLIonPopoverElement;
  constructor(
    public popoverController: PopoverController,
    private modalCtr: ModalController,
    private spoonApi: SpoonacularService,
    private itemCtrl: ItemCrudService,
  ) {
    this.searchField = new FormControl('');
  }

  async ngOnInit() {
    this.items = [];
    const searchTerm$ = this.searchField.valueChanges.pipe(
      debounceTime(500),
      startWith(this.searchField)
    );
    this.itemList$ = await this.itemCtrl.getGrocery(this.user);
    this.itemList$.subscribe(items=>{
      console.log(items);
      for(const item of items){
        for(const i of item.Items){
          this.items.push(i);
        }
      }

      console.log(this.items);
    });

    // this.items.push(new Item());
    this.searchField.valueChanges.subscribe(async search=>{
      console.log(search);
      // this.itemList$ = this.spoonApi.getItemSuggestion(search, 5);
      if(this.popover){
        console.log('POPOVER ALREADY OPEN');
        await this.popover.dismiss();
        // await this.popover.onDidDismiss();
      }
      this.presentPopover(searchTerm$);
    });

  }
  async searchItems(ev: KeyboardEvent){
    // console.log(ev);
    const box: HTMLTextAreaElement = ev.target as HTMLTextAreaElement;
    // console.log(typeof(ev));
    console.log(box.value);
    const createItem = new Item();
    createItem.strDescription = box.value;
    createItem.intQuantity = 1;
    const manual = this.itemCtrl.addGrocery(this.user, [createItem]).subscribe((ret)=>this.items.push(ret));
    console.log(manual);
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
      componentProps: {search: this.searchField.value, source: 'grocery'},
    });
    this.popOpen = true;
    await this.popover.present();
    const { role, data } = await this.popover.onDidDismiss();
    this.popOpen = false;
    console.log('onDidDismiss resolved with role', role, '\n returning data', data);
    if(data){
      this.items.push(data);
      this.searchField.setValue(null);
    }
  }

}
