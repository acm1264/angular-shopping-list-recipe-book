import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  //editting a recipe, else creating a new one
  editMode:boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router){}

  ngOnInit()
  {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          //check to see if we are editting an existing recipe (id already exists),
          //otherwise ew are in "new" mode
          this.editMode = params['id'] != null
          this.initForm();
        }
      )
  }

  onSubmit()
  {
    //no need to define the recipe here manually because the reactive setup has the same setup as our recipe
    // const newRecipe = new Recipe(this.recipeForm.value.name, 
    //                     this.recipeForm.value.description,
    //                     this.recipeForm.value.imagePath,
    //                     this.recipeForm.value.ingredients);
    if(this.editMode)
    {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else
    {
      this.recipeService.addRecipe(this.recipeForm.value)
    }

    //enusre we return bakc ot the previous page after done editing
    this.onLeaveEditPage();
  }

  //retrieve the controls for the ingredinets array to use with looping 
  //to create the elements in the form
  get controls() 
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm()
  {
    let reciptName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode) 
    {
      const recipe = this.recipeService.getRecipe(this.id);
      reciptName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      //ensre the recipe ebing loaded does in fact have ingredients 
      //(technically could make one wihtout them)
      if(recipe['ingredients'])
      {
        for(let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, 
                  [Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        } 
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(reciptName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  //add a new empty ingredinet to teh list of ingredients
  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onLeaveEditPage()
  {
    //when leaving the edit page with the cancel or save buttons, we should navigate back to 
    //the page for the recipe we werere just editing if there was one, else just
    //navigate back to the root "recipes" page
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
