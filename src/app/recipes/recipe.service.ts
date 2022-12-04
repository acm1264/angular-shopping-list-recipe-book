
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

//service to store/manage recipes for easy shared access
export class RecipeService
{
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
}