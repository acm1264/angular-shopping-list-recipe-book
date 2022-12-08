
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

//service to store/manage recipes for easy shared access
export class RecipeService
{
    recipesChanged = new Subject<Recipe[]>()

    //defining this variable's type to be an array of our custom "Recipe" class
    private recipes: Recipe[] = [
        new Recipe(
            "Test Recipe", 
            "description about this recipe", 
            "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
            [
                new Ingredient("Meat", 1),
                new Ingredient("Fries", 20)
            ]),
        new Recipe(
            "2nd Recipe", 
            "2nd recipe desc here... about this recipe",
            "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
            [
                new Ingredient("Apples", 1),
                new Ingredient("Bread", 20)
            ])
    ];

    //to keep the recipe list protected (only edittable in this class) return a copy of the array
    getRecipes()
    {
        return this.recipes.slice();
    }

    getRecipe(index: number)
    {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe)
    {
        this.recipes.push(recipe);
        this.triggerRecipeChangedEvent();
    }

    updateRecipe(index: number, recipe: Recipe)
    {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
        this.triggerRecipeChangedEvent();
    }

    deleteRecipe(index: number)
    {
        this.recipes.splice(index, 1);
        this.triggerRecipeChangedEvent();
    }

    triggerRecipeChangedEvent()
    {
        //must trigger event ot notify other parts of code that the recipes were changed
        //since a copy of the recipes array is displayed in those components, not the original,
        this.recipesChanged.next(this.recipes.slice());
    }
}