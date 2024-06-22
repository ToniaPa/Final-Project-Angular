import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmYesnoDialogComponent } from '../../confirm-yesno-dialog/confirm-yesno-dialog.component';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from 'src/app/shared/services/timesheet.service';
import { Timesheet, delTimesheet } from 'src/app/shared/interfaces/mongo-backend';
import { sortBy } from 'lodash';
import { DateAdapter } from '@angular/material/core';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import localeEl from '@angular/common/locales/el';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEl, 'el');
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-time-sheets-output-table',
  standalone: true,
  imports: [     
    DialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterLink,  
    FormsModule ,  
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" }
    }
  ],
  templateUrl: './time-sheets-output-table.component.html',
  styleUrl: './time-sheets-output-table.component.css'
})
export class TimeSheetsOutputTableComponent implements OnInit{
 
   // router = inject(Router);
   timesheetService = inject(TimesheetService);
 
   timesheets: Timesheet[];
   filteredTimesheets: any[] = [];
   searchInput: string;
 
   constructor(
     public dialog: Dialog,
     public matDialog: MatDialog,         
   ) {};

   snackBar = inject(MatSnackBar)

   get_all_timesheets() {
    this.timesheetService.getAllTimesheets().subscribe({
      next: (response) => {
        console.log("time-sheets-output-table.ts (get_all_timesheets) success");
        this.timesheets = response;
        this.filteredTimesheets = this.timesheets
        console.log("workers =", this.timesheets)      
      },
      error: (response) => {
        const message = response.error.msg;
        console.log("time-sheets-output-table.ts (get_all_timesheets)  error: ", message);
      },
    });
  }

  delete_timesheet(timesheet: delTimesheet) {
    console.log("onTimesheetDeleteClicked() from time-sheets-output-table.ts: ", timesheet)
    let id: string = ''
    id = timesheet._id     
    this.timesheetService.deleteTimesheetById(id).subscribe({
      next: (response) => {        
        console.log(`Worker: ${timesheet.dateOfWork} ${timesheet.workerSurName} ${timesheet.clientBrandName}, with Hours: ${timesheet.hourFrom} - ${timesheet.hourTo} was deleted successfully`);  
        console.log(response);
        this.snackBar.open('Timesheet deleted successfully!', 'Close', {
          duration: 3000, // Duration in milliseconds (3 seconds)  
        });
        this.get_all_timesheets();
      },
      error: (response) => {
        const message = response.error.msg;
        console.error(`There was an error in deleting Timesheet ${timesheet.dateOfWork} ${timesheet.workerSurName} ${timesheet.clientBrandName}, with Hours: ${timesheet.hourFrom} - ${timesheet.hourTo}`, message);       
      }
    });
  }

   //Sorting
   sortOrder = {
    dateOfWork: 'none',
    workerGivenName: 'none',    
    workerSurName: 'none',
    clientBrandName: 'none',
    typeOfWork: 'none',
    hourFrom: 'none',
    hourTo: 'none',
  };

  sortData(sortKey: string) { //εναλλαγή μεταξύ asc και desc:
    if (this.sortOrder[sortKey] === 'asc') { // το sortOrder είναι object
      this.sortOrder[sortKey] = 'desc';
      this.filteredTimesheets = sortBy(this.filteredTimesheets, sortKey).reverse(); //sortBy είναι μέθοδος της lodash, η reverse είναι μεθοδος της typescript      
    } else {
      this.sortOrder[sortKey] = 'asc';
      this.filteredTimesheets = sortBy(this.filteredTimesheets, sortKey); //sortBy είναι μέθοδος της lodash
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
    filterTimesheets(): void {
      this.filteredTimesheets = this.timesheets;  
      // alert(this.searchInput);    
      const lowerCaseQuery = this.searchInput.toLowerCase().trim();
      this.filteredTimesheets = this.timesheets.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(lowerCaseQuery)
        )
      );
      // console.log("filter:", lowerCaseQuery)
      // console.log("filtered workers: ", this.filteredWorkers);
    }
  
    clearFilterTimesheets(): void {
      this.searchInput = '';
      this.filteredTimesheets = this.timesheets;
    }
    //end of Search

  //
  ngOnInit(): void {    
    this.get_all_timesheets();
  }

  onTimesheetDeleteClicked(timesheet: delTimesheet) { 
    console.log("clicked for delete: ", timesheet)
    const dialogRef = this.matDialog.open(ConfirmYesnoDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete Timesheet: ${timesheet.dateOfWork} ${timesheet.workerSurName} ${timesheet.clientBrandName}, with Hours: ${timesheet.hourFrom} - ${timesheet.hourTo}?`}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the deletion action
        this.delete_timesheet(timesheet);
        console.log('Yes clicked');
      } else {
        // Cancel the deletion action
        console.log('No clicked');
      }
    });       
  };
}


