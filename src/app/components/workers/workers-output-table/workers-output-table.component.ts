import { Component, EventEmitter, Inject, OnInit, Output, inject } from '@angular/core';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { Worker } from 'src/app/shared/interfaces/mongo-backend';
import { sortBy } from 'lodash';
//από το https://material.angular.io/cdk/dialog/overview:
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { WorkerOutputDetailsComponent } from '../worker-output-details/worker-output-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmYesnoDialogComponent } from '../../confirm-yesno-dialog/confirm-yesno-dialog.component';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Router, RouterLink } from '@angular/router';
import { SharedataService } from 'src/app/shared/data/sharedata.service';
import { Subscription } from 'rxjs';
import { WorkerUpdateComponent } from '../worker-update/worker-update.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workers-output-table',
  standalone: true,
  imports: [
    DialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,   
    WorkerUpdateComponent,
    FormsModule ,
    MatSnackBarModule,
  ],
  templateUrl: './workers-output-table.component.html',
  styleUrl: './workers-output-table.component.css'
})
export class WorkersOutputTableComponent implements OnInit {

  // router = inject(Router);
  workerService = inject(WorkerService);
  sharedataService = inject(SharedataService);

  workers: Worker[];
  filteredWorkers: any[] = [];
  searchInput: string;

  constructor(
    public dialog: Dialog,
    public matDialog: MatDialog,    
  ) {};

  snackBar = inject(MatSnackBar)

  // @Output() workerEditClicked = new EventEmitter<Worker>();

  get_all_workers() {
    this.workerService.getAllWorkers().subscribe({
      next: (response) => {
        console.log("workers-output-table.ts (get_all_workers) success");
        this.workers = response;
        this.filteredWorkers = this.workers
        console.log("workers =", this.workers)      
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("workers-output-table.ts (get_all_workers)  error: ", message);
        // this.form.get('email').setErrors({ duplicateEmail: true });
      },
    });
  }
 
  delete_worker(worker: Worker) {
    console.log("onWorkerDeleteClicked() from workers-output-table.ts: ", worker)
    let afm: string = ''
    afm = worker.afm
    // afm = worker.afm
    console.log("onWorkerDeleteClicked() from workers-output-table.ts, AFM: ", afm)
    // this.workerService.deleteWorker(worker.afm).subscribe({
      this.workerService.deleteWorker(afm).subscribe({
      next: (response) => {        
        console.log(`Worker: ${worker.givenName} ${worker.surName}, with Afm: ${worker.afm} was deleted successfully`);  
        console.log(response);
        this.snackBar.open('Worker deleted successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds (3 seconds)  
        });
        this.get_all_workers();
      },
      error: (response) => {
        const message = response.error.msg;
        console.error(`There was an error in deleting Worker ${worker.givenName} ${worker.surName} with Afm ${worker.afm}`, message);       
      }
    });
  }

  //Sorting
  sortOrder = {
    givenName: 'none',
    surName: 'none',    
    email: 'none',
    afm: 'none',
  };

  sortData(sortKey: string) { //εναλλαγή μεταξύ asc και desc:
    if (this.sortOrder[sortKey] === 'asc') { // το sortOrder είναι object
      this.sortOrder[sortKey] = 'desc';
      this.filteredWorkers = sortBy(this.filteredWorkers, sortKey).reverse(); //sortBy είναι μέθοδος της lodash, η reverse είναι μεθοδος της typescript      
    } else {
      this.sortOrder[sortKey] = 'asc';
      this.filteredWorkers = sortBy(this.filteredWorkers, sortKey); //sortBy είναι μέθοδος της lodash
    };

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'; //= init all other fields, except the one for sorting
      }
    };
  };

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '↑';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '↓';
    } else {
      return '';
    };
  };
  //end of Sorting

  //Search
  filterWorkers(): void {
    this.filteredWorkers = this.workers;  
    // alert(this.searchInput);    
    const lowerCaseQuery = this.searchInput.toLowerCase().trim();
    this.filteredWorkers = this.workers.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
    // console.log("filter:", lowerCaseQuery)
    // console.log("filtered workers: ", this.filteredWorkers);
  }

  clearFilterWorkers(): void {
    this.searchInput = '';
    this.filteredWorkers = this.workers;
  }
  //end of Search

  //
  ngOnInit(): void {    
    this.get_all_workers();
    // this.filteredWorkers = this.workers;
  }

  onWorkerDetailsClicked(worker: Worker) { 
    console.log("dblclicked/clicked for details: ", worker)
    // this.workerClicked.emit(worker); 
   
    this.dialog.open(WorkerDialogComponent, {     
      data: worker,
    });
  };
 
  onWorkerEditClicked(worker: Worker) { 
    // όχι με emitter, δεν είναι parent-child
    // console.log("clicked for edit: ", worker)   
    this.sharedataService.sendWorker(worker); // μέσω του SharedataService
  };

  onWorkerDeleteClicked(worker: Worker) { 
    console.log("clicked for delete: ", worker)
    const dialogRef = this.matDialog.open(ConfirmYesnoDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete worker: ${worker.givenName} ${worker.surName}?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the deletion action
        this.delete_worker(worker);
        console.log('Yes clicked');
      } else {
        // Cancel the deletion action
        console.log('No clicked');
      }
    });       
  };
};
// end of class WorkersOutputTableComponent
  

//χειρoκίνητο component, το φτιάχνουμε εμείς
@Component({
  imports: [WorkerOutputDetailsComponent],
  standalone: true,
  template: `
  <app-worker-output-details [worker]="worker"></app-worker-output-details>    
    <button class="btn btn-light btn-sm bg-dark-subtle" (click)="dialogRef.close()">
      Close
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
        background: #fff;
        border-radius: 8px;
        padding: 16px;
        max-width: 500px;
      }
    `,
  ],
})
class WorkerDialogComponent {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public worker: Worker,
  ) {}
}
