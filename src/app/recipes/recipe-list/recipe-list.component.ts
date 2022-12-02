import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  //recipes will be pulled in from the Recipe Service
  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
