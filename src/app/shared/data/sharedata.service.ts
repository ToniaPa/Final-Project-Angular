import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Worker } from 'src/app/shared/interfaces/mongo-backend';

@Injectable({
  providedIn: 'root'
})
export class SharedataService { 

  workerData: Worker; //εδω βάζω τα data του worker
  // workerId: string ="";

  //***worker***//
  private dataWorkerSubject = new Subject<Worker>();
  workerData$ = this.dataWorkerSubject.asObservable();

  sendWorker(workerData: Worker) {
    this.dataWorkerSubject.next(workerData);
    // this.workerId = this.workerData.id;
  }


 

  //end of worker-



}
