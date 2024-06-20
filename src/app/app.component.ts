import { Component } from '@angular/core';
import { NavbarOnTopComponent } from './components/navbar-on-top/navbar-on-top.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink, 
    RouterOutlet, 
    NavbarOnTopComponent,
    MenuItemsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
 
})
export class AppComponent {
  title = 'Time Sheets App';  
}
