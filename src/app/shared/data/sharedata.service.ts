import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client, Timesheet, Worker } from 'src/app/shared/interfaces/mongo-backend';

@Injectable({
  providedIn: 'root'
})
export class SharedataService { 

  //*** Worker: ***//
  workerData: Worker; //εδω βάζω τα data του worker
  // workerId: string ="";
 
  private dataWorkerSubject = new Subject<Worker>();
  workerData$ = this.dataWorkerSubject.asObservable();

  sendWorker(workerData: Worker) {
    this.dataWorkerSubject.next(workerData);
    // this.workerId = this.workerData.id;
  }
  //end of worker-

  //***

  //*** Client: ***//
  clientData: Client; //εδω βάζω τα data του client
  // clientId: string ="";
  
  private dataClientSubject = new Subject<Client>();
  clientData$ = this.dataClientSubject.asObservable();

  sendClient(clientData: Client) {
    this.dataClientSubject.next(clientData);
    // this.clientId = this.clientData.id;
  }
  //end of client-
  
  //***
  
  //*** Timesheet: ***//
  timesheetData: Timesheet; //εδω βάζω τα data του client
  // clientId: string ="";
  
  private dataTimesheetSubject = new Subject<Timesheet>();
  timesheetData$ = this.dataTimesheetSubject.asObservable();

  sendTimesheet(timesheetData: Timesheet) {
    this.dataTimesheetSubject.next(timesheetData);   
  }
  //end of Timesheet-

}
