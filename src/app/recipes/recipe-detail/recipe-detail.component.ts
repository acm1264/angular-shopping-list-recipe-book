import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipeDisplayed: Recipe;
    id: number;

    constructor(private shoppingListService: ShoppingListService,
                private recipeService: RecipeService,
                private route: ActivatedRoute){}

  ngOnInit() {
    //need ot subscripbe to the URL path route to update the display whenever the id of the recipe to be displayed is changed
    this.route.params.subscribe(
      (params: Params) => {
        //the data from the route will have the id of the recipe, which corresponds to the index of the recipe in the
        //array of all recipes we have saved in the recipesService. Use '+' to convert the string data to a number to
        //access the recipe at that index
        this.id = +params['id']
        this.recipeDisplayed = this.recipeService.getRecipe(this.id);
      }
    );
  }

    onAddRecipeIngredientsToShoppingList()
    {
      this.shoppingListService.addIngredients(this.recipeDisplayed.ingredients)
    }

    onDeleteRecipe()
    {
      this.recipeService.deleteRecipe(this.id);
    }
}
