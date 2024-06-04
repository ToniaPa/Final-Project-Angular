import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-navbar-on-top',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,     
  ],
  templateUrl: './navbar-on-top.component.html',
  styleUrl: './navbar-on-top.component.css'
})
export class NavbarOnTopComponent {

  userService = inject(UserService); //o constructor θα εκτελεστεί μία μόνο φορά

  user = this.userService.user; //= το signal του user.service.ts

  logout() {
    this.userService.logoutUser();
  }
}
