import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  optionBeingDisplayed = "recipe"
  
  onNavigate(option: string)
  {
    this.optionBeingDisplayed = option;
  }
}
