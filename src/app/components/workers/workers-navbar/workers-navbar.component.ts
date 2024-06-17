import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-workers-navbar',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './workers-navbar.component.html',
  styleUrl: './workers-navbar.component.css'
})
export class WorkersNavbarComponent {


  // search(query: string): void {
  //   // Implement your search logic here
  //   console.log('Searching for:', query);
  //   // You can add further logic to handle the search functionality
  // }

}
