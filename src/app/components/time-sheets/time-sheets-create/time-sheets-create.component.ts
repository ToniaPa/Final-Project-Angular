import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/shared/services/client.service';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { TimesheetService } from 'src/app/shared/services/timesheet.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: './time-sheets-create.component.html',
  styleUrl: './time-sheets-create.component.css' 
})
export class TimeSheetsCreateComponent {

  router = inject(Router);
  clientService = inject(ClientService);
  workerService = inject(WorkerService);
  timesheetService = inject(TimesheetService)

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('el-GR');        
  }

  public date_Today = new Date(); //= current day

  //*******//

  form = new FormGroup({
    dateOfWork: new FormControl(new Date(), Validators.required),
    workerGivenName: new FormControl('', Validators.required),
    workerSurName: new FormControl('', Validators.required),   
    workerAfm: new FormControl('', [Validators.required, 
                              Validators.minLength(9),
                              Validators.maxLength(9),
                              Validators.pattern('^[0-9]*$'),
                            ]
                        ),
    clientBrandName: new FormControl('', Validators.required),       
    clientAfm: new FormControl('', [Validators.required, 
                              Validators.minLength(9),
                              Validators.maxLength(9),
                              Validators.pattern('^[0-9]*$'),
                            ]
                        ),
    typeOfWork: new FormControl('', Validators.required),   
    hourFrom: new FormControl('', Validators.required),    
    hourTo: new FormControl('', Validators.required),
    additionalInfo: new FormControl(''),   
  });

  
// *******//

registrationStatus: { success: boolean; message: string } = {
  success: false, //initial value
  message: 'Not attempted yet', //initial value
};

submit(value: any){}

addAgainClient(){}

addAnotherClient(){}

}
