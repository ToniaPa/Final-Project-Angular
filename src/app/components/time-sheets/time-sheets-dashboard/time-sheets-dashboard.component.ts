import { Component } from '@angular/core';
import { TimeSheetsNavbarComponent } from '../time-sheets-navbar/time-sheets-navbar.component';
import { TimeSheetsOutputTableComponent } from '../time-sheets-output-table/time-sheets-output-table.component';

@Component({
  selector: 'app-time-sheets-dashboard',
  standalone: true,
  imports: [
    TimeSheetsNavbarComponent,
    TimeSheetsOutputTableComponent,
  ],
  templateUrl: './time-sheets-dashboard.component.html',
  styleUrl: './time-sheets-dashboard.component.css'
})
export class TimeSheetsDashboardComponent {

}
