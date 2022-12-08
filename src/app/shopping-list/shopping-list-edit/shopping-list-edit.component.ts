import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{

  //values needed for form management
  @ViewChild('formRef') shoppingListForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  //accessing the eleemnt with the local reference of "nameInput" and storign that entire element (NOT just the value) in the
  //property "nameInputted" (the variable names could have been the same, but made them different to illustrate that
  //the one in hte () is referencing the elemnet from the html)
  @ViewChild("nameInput", {static: false}) nameInputted: ElementRef;
  @ViewChild("amountInput", {static: false}) amountInputted: ElementRef;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  ngOnDestroy(): void {
    //since we have a custom subscription (not somethign handled by angular by default)
    //we need to manually unsubscribe from it to avoid memory leak
    this.subscription.unsubscribe();
  }

  //this function hanldes submitting an ingredient (either adding a new one or updating an existing one)
  onSubmitIngredient(form: NgForm)
  {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode)
    {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else
    {
      this.shoppingListService.addIngredient(newIngredient)
    }

    //ensure the form is fully cleared out 
    this.onClear();
  }


  onDelete()
  {
    //can only delete element if it is already in the form (aka you are in edit mode, not 'add new' mode)
    if(this.editMode)
    {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      //ensure teh form is fully cleared out 
      this.onClear();
    }
  }

  onClear()
  {
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
