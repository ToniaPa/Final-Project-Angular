import { Component, EventEmitter, Inject, OnInit, Output, inject } from '@angular/core';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { Worker } from 'src/app/shared/interfaces/mongo-backend';
import { sortBy } from 'lodash';
//από το https://material.angular.io/cdk/dialog/overview:
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { WorkerOutputDetailsComponent } from '../worker-output-details/worker-output-details.component';

@Component({
  selector: 'app-workers-output-table',
  standalone: true,
  imports: [
    DialogModule,
  ],
  templateUrl: './workers-output-table.component.html',
  styleUrl: './workers-output-table.component.css'
})
export class WorkersOutputTableComponent implements OnInit {

  // @Output() workerClicked = new EventEmitter<Worker>();

  workerService = inject(WorkerService);

  workers: Worker[];

  get_all_workers() {
    this.workerService.getAllWorkers().subscribe({
      next: (response) => {
        console.log("workers-output-table.ts (get_all_workers) success");
        this.workers = response;
        console.log("workers =", this.workers)      
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("workers-output-table.ts (get_all_workers)  error: ", message);
        // this.form.get('email').setErrors({ duplicateEmail: true });
      },
    });
  }

  ngOnInit(): void {    
    this.get_all_workers();
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
      this.workers = sortBy(this.workers, sortKey).reverse(); //sortBy είναι μέθοδος της lodash, η reverse είναι μεθοδος της typescript      
    } else {
      this.sortOrder[sortKey] = 'asc';
      this.workers = sortBy(this.workers, sortKey); //sortBy είναι μέθοδος της lodash
    }

    for (let key in this.sortOrder) {
      if (key !== sortKey) {
        this.sortOrder[key] = 'none'; //= init all other fields, except the one for sorting
      }
    }
  }

  sortSign(sortKey: string) {
    if (this.sortOrder[sortKey] === 'asc') {
      return '↑';
    } else if (this.sortOrder[sortKey] === 'desc') {
      return '↓';
    } else {
      return '';
    }
  }

  //από το https://material.angular.io/cdk/dialog/overview
  constructor(public dialog: Dialog) {};

  onWorkerClicked(worker: Worker) { //@Output, dbclick
    console.log("dblclicked: ", worker)
    // this.workerClicked.emit(worker); //Emits (εκπέμπω) an event containing a given value. param = the value to emit.
    //από το https://material.angular.io/components/dialog/overview
    this.dialog.open(WorkerDialogComponent, {     
      data: worker,
    });
  }
}

//χειρoκίνητο component, το φτιάχνουμε εμείς
@Component({
  imports: [WorkerOutputDetailsComponent],
  standalone: true,
  template: `
  <app-worker-output-details [worker]="worker"></app-worker-output-details>    
    <button class="btn btn-primary btn-sm" (click)="dialogRef.close()">
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
