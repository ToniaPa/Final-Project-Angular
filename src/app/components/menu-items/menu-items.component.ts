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
      text: 'Registrations',
      routerLink: 'registration-of-data',
    },
    // {
    //   text: 'Simple Datatable Example',
    //   routerLink: 'simple-datatable-example',
    // },
    // {
    //   text: 'Component Output Example',
    //   routerLink: 'component-output-example',
    // },
  ];
}