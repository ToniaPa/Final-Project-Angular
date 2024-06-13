import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Worker } from 'src/app/shared/interfaces/mongo-backend';

@Injectable({
  providedIn: 'root'
})
export class SharedataService { 

  //***worker***//
  private dataWorkerSubject = new Subject<Worker>();
  workerData$ = this.dataWorkerSubject.asObservable();

  sendWorker(workerData: Worker) {
    this.dataWorkerSubject.next(workerData);
  }

  workerData: Worker; //εδω βάζω τα data του worker

  //end of worker-



}
