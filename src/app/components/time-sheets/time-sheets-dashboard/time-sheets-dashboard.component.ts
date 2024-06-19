import { Component } from '@angular/core';
import { TimeSheetsNavbarComponent } from '../time-sheets-navbar/time-sheets-navbar.component';

@Component({
  selector: 'app-time-sheets-dashboard',
  standalone: true,
  imports: [TimeSheetsNavbarComponent],
  templateUrl: './time-sheets-dashboard.component.html',
  styleUrl: './time-sheets-dashboard.component.css'
})
export class TimeSheetsDashboardComponent {

}
