import { Component, Input } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
    @Input() recipeDisplayed: Recipe;

    constructor(private shoppingListService: ShoppingListService){}

    onAddRecipeIngredientsToShoppingList()
    {
      this.shoppingListService.addIngredients(this.recipeDisplayed.ingredients)
    }
}
