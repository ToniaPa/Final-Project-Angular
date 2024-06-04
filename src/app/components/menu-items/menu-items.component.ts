import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/shared/interfaces/menu-item';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [
    RouterLink, 
    RouterLinkActive,
  ],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.css'
})
export class MenuItemsComponent {
  menu: MenuItem[] = [    
    {
      text: 'User Registration',
      routerLink: 'user-registration',
    },
    {
      text: 'Workers',
      routerLink: 'workers',
    },
    {
      text: 'Clients',
      routerLink: 'clients',
    },
    {
      text: 'Work Types',
      routerLink: 'work-types',
    },
    {
      text: 'Time Sheet',
      routerLink: 'time-sheet',
    },

  ];
}
