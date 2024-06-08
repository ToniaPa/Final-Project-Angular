import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Worker } from '../interfaces/mongo-backend';


const API_URL = `${environment.apiURL}/worker`;

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  http: HttpClient = inject(HttpClient);

  createWorker(worker: Worker) {
    return this.http.post<{ msg: string }>(`${API_URL}/create`, worker);
  }
 
}
