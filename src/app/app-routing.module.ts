//this module is the master handler of all the routes to navigate throughout this angular single page app
import {NgModule} from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component'
import { RecipeNotSelectedComponent } from './recipes/recipe-detail/recipe-not-selected/recipe-not-selected.component'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component'
import { RecipesComponent } from './recipes/recipes.component'
import { ShoppingListComponent } from './shopping-list/shopping-list.component'
const appRoutes: Routes = [
    //when the path with the given string is setup to load, it will trigger the given component beign loaded.

    //the "home"/"root" path will be loading the recipes page, so just redirect ot that route (ensure the
    //full path is an exact match, otherwise, since every route technically has the "empty route" at the
    ///start of it, any URL will trigger this redirect, but we only want the actual home path to redirect)
    { path: "", redirectTo: "/recipes", pathMatch: 'full' },
    { path: "recipes", component: RecipesComponent, children: [
        //before a recipe is selected, this special placeholder component will be displayed to indicate 
        //the user they need to select one (once on eis selected, an id will be added to the path and
        //thus will load the appropriate recipe detail component)
        { path: "", component: RecipeNotSelectedComponent, pathMatch: 'full' },
        //routes with dynamic params MUST be after all routes without dynamic params. If the "new" route is after
        //the ":id" dynamic route, then "new" will be stored into id and and the recipe detail component will be added
        //and it will never reach the "new" path
        { path: "new", component: RecipeEditComponent},
        { path: ":id", component: RecipeDetailComponent },
        { path: ":id/edit", component: RecipeEditComponent}
    ] },
    { path: "shopping-list", 
        component: ShoppingListComponent, 
        children: [
            //the "resolve" property and teh "data" property will both store
            //data that can be accessed by components using the ActivatedRoute
            //and grabbing the "data" property. The difference is that "data" 
            //is hard coded in the route in this file, while the "resolve" is
            //dynamically created and can vary based on the route url being loaded
            // { path: ":id", component: ServerComponent, resolve: {server: ServerResolver} },
            // { path: ":id/edit", component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
  
    // {path: 'not-found', component: PageNotFoundComponent},
    // {path: 'not-found', component: ErrorPageComponent, data: {message: "Page not Found"}},
    //the ** route is the wildcard catch-all that will trigger if none of the other routes are valid from above.
    //Routes get parsed top to bottom, so this MUST be the last one in the array
    // { path: '**', redirectTo: '/not-found'}
  ]

@NgModule({
    imports: [
        //need to not only import the router module but also specify the array of routes to use
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule
{

}