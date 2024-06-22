import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS, getLocaleDateFormat } from '@angular/common';
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
import { WorkType, selectedClient, selectedWorker } from 'src/app/shared/interfaces/timesheet';
import { Client, Timesheet, Worker } from 'src/app/shared/interfaces/mongo-backend';
import { sortBy } from 'lodash';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule,
  ],
  templateUrl: './time-sheets-create.component.html',
  styleUrl: './time-sheets-create.component.css' 
})
export class TimeSheetsCreateComponent implements OnInit{

  router = inject(Router);
  clientService = inject(ClientService);
  workerService = inject(WorkerService);
  timesheetService = inject(TimesheetService)
  snackBar = inject(MatSnackBar)

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('el-GR');        
  }

  public date_Today = new Date(); //= current day  
  public todayStr = this.date_Today.toISOString();
  

  workers: Worker[];    
  selectedWorker: selectedWorker | null = null;
  clients: Client[];
  selectedClient: selectedClient | null = null;

  workTypes: WorkType[] = [
    { value: 'Cleaning', viewValue: 'Cleaning Services' },
    { value: 'Security', viewValue: 'Security Services' },
    { value: 'Sales', viewValue: 'Sales employee' },
    { value: 'Accounting', viewValue: 'Αccountant' },
    { value: 'Restaurant', viewValue: 'Restaurant employee' }
  ];

  ngOnInit(): void {    
    this.get_all_workers();      
    this.get_all_clients();    
    this.workTypes.sort((a, b) => a.viewValue.localeCompare(b.viewValue));
    console.log("todayStr = ", this.todayStr)
  }

  get_all_workers() {
    this.workerService.getAllWorkers().subscribe({
      next: (response) => {
        console.log("time-sheet-create.ts (get_all_workers, ngOnInit) success");
        this.workers = response;        
        console.log("time-sheet-create.ts (get_all_workers, ngOnInit) workers =", this.workers)   
        this.workers.sort((a, b) => a.surName.localeCompare(b.surName));
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
        this.clients.sort((a, b) => a.brandName.localeCompare(b.brandName));
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("ime-sheet-create.ts (get_all_clients, ngOnInit)  error: ", message);     
      },
    });
  }

  onSelectionWorkerChange(event: any) {
    // console.log('Selection Worker changed:', event.value);
    this.selectedWorker = event.value;
    // console.log(this.selectedWorker)   
    this.form.patchValue({              
      workerGivenName: this.selectedWorker.givenName,
      workerSurName: this.selectedWorker.surName,      
      workerAfm: this.selectedWorker.afm,      
    })
  }

  onSelectionClientChange(event: any) {
    // console.log('Selection Client changed:', event.value);
    this.selectedClient = event.value;
    // console.log(this.selectedClient)   
    this.form.patchValue({              
      clientBrandName: this.selectedClient.brandName,      
      clientAfm: this.selectedClient.afm,      
    })
  }

  //*******//

  form = new FormGroup({
    dateOfWork: new FormControl(this.date_Today, Validators.required),
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
    hourFrom: new FormControl('08:00', Validators.required),    
    hourTo: new FormControl('16:00', Validators.required),     
  });

  
// *******//

  registrationStatus: { success: boolean; message: string } = {
    success: false, //initial value
    message: 'Not attempted yet', //initial value
  };

  comparisonResult: string;
  comparisonHours: number;

  compareHours(): void {
    const hourFrom = this.form.get('hourFrom').value;
    const hourTo = this.form.get('hourTo').value;

    if (hourFrom && hourTo) {
      const [hoursFrom, minutesFrom] = hourFrom.split(':').map(Number);
      const [hoursTo, minutesTo] = hourTo.split(':').map(Number);

      const dateFrom = new Date();
      dateFrom.setHours(hoursFrom, minutesFrom, 0, 0);

      const dateTo = new Date();
      dateTo.setHours(hoursTo, minutesTo, 0, 0);

      if (dateFrom > dateTo) {
        this.comparisonResult = 'Hour From is later than Hour To';
        this.comparisonHours = -1;
      } else if (dateFrom < dateTo) {
        this.comparisonResult = 'Hour From is earlier than Hour To';
        this.comparisonHours = 1; //ok
      } else {
        this.comparisonResult = 'Hour From is equal to Hour To';
        this.comparisonHours = 0;
      }
    } 
  }


  submit(value: any){
    this.comparisonResult = '';
    this.comparisonHours = null;
    this.compareHours();
    if (this.comparisonHours !== 1) {
      this.snackBar.open( this.comparisonResult + ", Please correct Hours", 'Close', {
        duration: 3000, // Duration in milliseconds (3 seconds)  
        // horizontalPosition: 'right',
        verticalPosition: 'bottom',        
        panelClass: 'custom-snackbar"',
      })
    } else {
      const timesheet = this.form.value as Timesheet    
      console.log("timesheet = ", timesheet)      
      this.timesheetService.createTimesheet(timesheet).subscribe({
        next: (response) => {
          // this.form.reset();
          this.registrationStatus = { success: true, message: response.msg };
        },
        error: (response) => {
          const message = response.error.msg;
          console.error(`There was an error in adding a Timesheet: , ${message}, error code: ${message.code}`);
          this.registrationStatus = { success: false, message }; 
        }
      })       

    }
  }

  addAgainTimesheet(){
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }

  addAnotherTimesheet(){
    this.form.reset(); 
    this.selectedWorker = null;
    this.selectedClient = null;
    this.form.patchValue({      
      dateOfWork: this.date_Today,        
      hourFrom: '08:00',
      hourTo: '16:00',        
    })
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }

  resetForm(){
    this.form.reset(); 
    this.selectedWorker = null;
    this.selectedClient = null;
    this.form.patchValue({      
      dateOfWork: this.date_Today,        
      hourFrom: '08:00',
      hourTo: '16:00',        
    })
    this.registrationStatus = { success: false, message: 'Not attempted yet' };
  }
}
