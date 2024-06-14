import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Worker } from '../interfaces/mongo-backend';


const API_URL = `${environment.apiURL}/workers`;

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  http: HttpClient = inject(HttpClient);

  createWorker(worker: Worker) {
    return this.http.post<{ msg: string }>(`${API_URL}/create`, worker);
  }

  getAllWorkers() {
    return this.http.get<Worker[]>(`${API_URL}/`);
  }

  deleteWorker(afm: string) { 
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/afm/${afm}`;
    console.log("url from worker.service.ts (Delete):", url)
    return this.http.delete(url, httpOptions);
  }

  updateWorkerByAfm(afm: string, worker: Worker) {
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/afm/${afm}`;
    console.log("url from worker.service.ts (Update):", url)
    return this.http.patch(url, worker, httpOptions);
  }

  // id is undefined.... => δεν έχω την τιμή του...!
  // updateWorkerById(id: string, worker: Worker) {
  //   // console.log("Worker to delete (from worker.service.ts):", worker) 
  //   console.log("Worker to update (from worker.service.ts), _id:", id) 
  //   console.log("Worker to update (from worker.service.ts), WORKER:", worker) 
  //   const httpOptions = {
  //         headers: new HttpHeaders({
  //           'Content-Type': 'application/json'
  //         })
  //       };
  //   const url = `${API_URL}/afm/${id}`;
  //   console.log("url from worker.service.ts (Update):", url)
  //   console.log("id from worker.service.ts (Update):", id)
  //   return this.http.patch(url, worker, httpOptions);
  // }
 
}