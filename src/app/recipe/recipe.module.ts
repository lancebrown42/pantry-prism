import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipePage } from './recipe.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipeAutocomplete } from '../models/recipe-autocomplete.model';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreService } from '../services/store.service';
import { IonicSelectableComponent } from '@ionic-selectable/angular';


import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipeService } from '../services/recipe.service';
// import { LoaderService } from '../../services/loader.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
  switchMap,
  finalize,
} from 'rxjs/operators';



import { RecipePageRoutingModule } from './recipe-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RecipePageRoutingModule,
    FormsModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,

  ],
  declarations: [RecipePage, IonicSelectableComponent],
  providers: [RecipeService, StoreService],
  exports:[IonicSelectableComponent]
})
export class RecipePageModule {}
