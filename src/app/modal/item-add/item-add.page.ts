import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from 'src/app/models/item.model';
import { PopoverController } from '@ionic/angular';
import { SpoonacularService } from '../../services/spoonacular.service';
import { AutocompletePopoverComponent } from 'src/app/autocomplete-popover/autocomplete-popover.component';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {
  @Input() name: string;
  items: Item[];
  public searchField: FormControl;
  public itemList$: Observable<Item[]>;
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
    this.items = [];
    // this.items.push(new Item());
    const itemList$ = new Observable<Item[]>();
    this.searchField.valueChanges.subscribe(async search=>{
      console.log(search);
      // this.itemList$ = this.spoonApi.getItemSuggestion(search, 5);
      if(this.popover){
        console.log('POPOVER ALREADY OPEN');
        await this.popover.dismiss().then(this.popover = null);
        // await this.popover.onDidDismiss();
      }else{

        this.presentPopover(searchTerm$);
      }
    });
    // this.itemList$ = combineLatest([itemList$, searchTerm$]).pipe(
    //   map(([itemList, searchTerm])=>
    //   itemList.filter(
    //     (item)=>
    //       searchTerm === '' ||
    //       item.strDescription.toLowerCase().includes(searchTerm.toLowerCase())
    //   ))
    // );
  }

  async close() {
    // const closeModal = 'Modal Closed';
    console.log(this.searchField.value);
    await this.modalCtr.dismiss(this.items);
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
      componentProps: {search: this.searchField.value, source: 'item-add'},
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
