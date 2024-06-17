import { Component } from '@angular/core';
import { ClientsNavbarComponent } from '../clients-navbar/clients-navbar.component';
import { ClientsOutputTableComponent } from '../clients-output-table/clients-output-table.component';



@Component({
  selector: 'app-clients-dashboard',
  standalone: true,
  imports: [
    ClientsNavbarComponent,
    ClientsOutputTableComponent
  ],
  templateUrl: './clients-dashboard.component.html',
  styleUrl: './clients-dashboard.component.css'
})
export class ClientsDashboardComponent {

}
