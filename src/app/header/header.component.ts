import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //variable manages whether or not mobile display is active for using he collapsed hamnburger menu
  collapsed = true;
}
