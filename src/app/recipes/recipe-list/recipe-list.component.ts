import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  //defining this variable's type to be an array of our custom "Recipe" class
  recipes: Recipe[] = [
    new Recipe("Test Recipe", "description about this recipe", "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg"),
    new Recipe("2nd Recipe", "2nd recipe desc here... about this recipe", "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg")
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();




  onRecipeClicked(recipe: Recipe)
  {
    this.recipeWasSelected.emit(recipe);
  }
}
