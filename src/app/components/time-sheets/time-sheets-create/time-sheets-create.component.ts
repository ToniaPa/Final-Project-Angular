import { Component, OnInit, inject } from '@angular/core';
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
import { selectedClient, selectedWorker } from 'src/app/shared/interfaces/timesheet';
import { Client, Worker } from 'src/app/shared/interfaces/mongo-backend';

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
export class TimeSheetsCreateComponent implements OnInit{

  router = inject(Router);
  clientService = inject(ClientService);
  workerService = inject(WorkerService);
  timesheetService = inject(TimesheetService)

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('el-GR');        
  }

  public date_Today = new Date(); //= current day
  // public time_From = new Time

  workers: Worker[];    
  selectedWorker: selectedWorker | null = null;
  clients: Client[];
  selectedClient: selectedClient | null = null;

  ngOnInit(): void {    
    this.get_all_workers();   
    this.get_all_clients();
  }

  get_all_workers() {
    this.workerService.getAllWorkers().subscribe({
      next: (response) => {
        console.log("time-sheet-create.ts (get_all_workers, ngOnInit) success");
        this.workers = response;        
        console.log("time-sheet-create.ts (get_all_workers, ngOnInit) workers =", this.workers)   
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("time-sheet-create.ts (get_all_workers, ngOnInit) error: ", message);        
      },
    });

  }

  get_all_clients() {
    this.clientService.getAllClients().subscribe({
      next: (response) => {
        console.log("ime-sheet-create.ts (get_all_clients, ngOnInit) success");
        this.clients = response;        
        console.log("clients =", this.clients)      
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("ime-sheet-create.ts (get_all_clients, ngOnInit)  error: ", message);     
      },
    });
  }

  onSelectionWorkerChange(event: any) {
    console.log('Selection Worker changed:', event.value);
    this.selectedWorker = event.value;
    console.log(this.selectedWorker)   
    this.form.patchValue({              
      workerGivenName: this.selectedWorker.givenName,
      workerSurName: this.selectedWorker.surName,      
      workerAfm: this.selectedWorker.afm,      
    })
  }

  onSelectionClientChange(event: any) {
    console.log('Selection Client changed:', event.value);
    this.selectedClient = event.value;
    console.log(this.selectedClient)   
    this.form.patchValue({              
      clientBrandName: this.selectedClient.brandName,      
      clientAfm: this.selectedClient.afm,      
    })
  }

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

addAgainTimesheet(){
  this.registrationStatus = { success: false, message: 'Not attempted yet' };
}

addAnotherTimesheet(){
  this.form.reset(); 
  this.registrationStatus = { success: false, message: 'Not attempted yet' };
}

}
