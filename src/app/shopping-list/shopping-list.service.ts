import { EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
    ]

    getIngredients()
    {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    //variant to add an array of ingredinets
    addIngredients(newIngredients: Ingredient[])
    {
        //this foreach approach works, but emits the event for the ingredints list beign updated
        //more times than necessary, so we will NOT use this approach
        // newIngredients.forEach((ing) => {
        //     this.addIngredient(ing);
        // })
        
        //the "spread" operator (...) allows us to emit all of the elements of one array into another
        //can't just insert the array directly because it would become multi-dimensional
        this.ingredients.push(...newIngredients)
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
}