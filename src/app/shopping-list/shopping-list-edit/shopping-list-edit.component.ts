import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {

  //accessing the eleemnt with the local reference of "nameInput" and storign that entire element (NOT just the value) in the
  //property "nameInputted" (the variable names could have been the same, but made them different to illustrate that
  //the one in hte () is referencing the elemnet from the html)
  @ViewChild("nameInput", {static: false}) nameInputted: ElementRef;
  @ViewChild("amountInput", {static: false}) amountInputted: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddIngredient()
  {
    this.ingredientAdded.emit(new Ingredient(this.nameInputted.nativeElement.value, 
                                            this.amountInputted.nativeElement.value))
  }
}
