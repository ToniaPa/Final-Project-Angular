import { Component } from '@angular/core';
import { WorkersNavbarComponent } from '../workers-navbar/workers-navbar.component';
import { WorkersOutputTableComponent } from '../workers-output-table/workers-output-table.component';

@Component({
  selector: 'app-workers-dashboard',
  standalone: true,
  imports: [
    WorkersNavbarComponent,
    WorkersOutputTableComponent,
  ],
  templateUrl: './workers-dashboard.component.html',
  styleUrl: './workers-dashboard.component.css'
})
export class WorkersDashboardComponent {

}
