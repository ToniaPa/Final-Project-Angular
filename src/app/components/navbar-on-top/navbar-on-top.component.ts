import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

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
  // userService = inject(UserService); //o constructor θα εκτελεστεί μία μόνο φορά, μπορεί να είναι σε διάφορα σημεία το inject(UserService); ΑΛΛΑ ο constructor θα εκτελεστεί μία μόνο φορά, την πρώτη που θα βρει το inject και δεν θα έχει δημιουργηθεί, όλα τα άλλα Inject κοιτάνε το ήδη δημιουργημένο

  // user = this.userService.user; //= το signal του user.service.ts

  // logout() {
  //   this.userService.logoutUser();
  // }
}
