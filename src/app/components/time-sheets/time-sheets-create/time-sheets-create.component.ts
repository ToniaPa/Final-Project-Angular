import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { TimesheetService } from 'src/app/shared/services/timesheet.service';

@Component({
  selector: 'app-time-sheets-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,    
    CommonModule,
  ],
  templateUrl: './time-sheets-create.component.html',
  styleUrl: './time-sheets-create.component.css'
})
export class TimeSheetsCreateComponent {

  router = inject(Router);
  clientService = inject(ClientService);
  workerService = inject(WorkerService);
  timesheetService = inject(TimesheetService)


  
}
