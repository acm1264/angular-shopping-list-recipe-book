import {Subject} from 'rxjs'

import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
    ingredientsChanged = new Subject<Ingredient[]>();

    //we can subscribe to this subject in the shopping list edit component to 
    //know when the function for selecting an item to edit was called in the shopping list component
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
    ]

    getIngredients()
    {
        return this.ingredients.slice();
    }

    getIngredient(index: number)
    {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice())
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
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    //change the values of hte ingredient at the given index
    updateIngredient(index: number, newIngredient: Ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    //take out the ingredient at the given index
    deleteIngredient(index: number)
    {
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
}