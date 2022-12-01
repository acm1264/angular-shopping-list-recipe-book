import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() recipeClicked = new EventEmitter<void>();


  //clicking the recipe will trigger the event to send the reciep data out for other components to read
  onRecipeClicked()
  {
    this.recipeClicked.emit();
  }
}
