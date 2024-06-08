import { Component } from '@angular/core';
import { WorkersNavbarComponent } from '../workers-navbar/workers-navbar.component';

@Component({
  selector: 'app-workers-dashboard',
  standalone: true,
  imports: [
    WorkersNavbarComponent
  ],
  templateUrl: './workers-dashboard.component.html',
  styleUrl: './workers-dashboard.component.css'
})
export class WorkersDashboardComponent {

}
