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
    // console.log("Worker to delete (from worker.service.ts):", worker) 
    console.log("Worker to delete (from worker.service.ts), AFM:", afm) 

    // const afm = worker.afm   
    // return this.http.post<{ msg: string }>(`${API_URL}/delete`, worker);
    // return this.http.post<{ msg: string }>(`${API_URL}/delete/<string:worker_id>`, worker_id);
    // return this.http.post<{ msg: string }>(`${API_URL}/delete/afm/<string:afm>`, afm);    
    // return this.http.post<{ msg: string }>(`${API_URL}/delete/afm/<string:afm>`, worker.afm);    

    //********//
    // TypeError: delete_worker() missing 1 required positional argument: 'worker'
    // return this.http.delete<{ msg: string }>(`${API_URL}/delete`, worker.afm);
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/afm/${afm}`;
    console.log("url from worker.service.ts:", url)
    return this.http.delete(url, httpOptions);

    // return this.http.delete<{ msg: string }>(`${API_URL}/delete/afm/${worker.afm}`); 
  }

  // deleteWorker(afm: string) {

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   };
  //   return this.http.delete(`${API_URL}/delete/afm/${afm}`, httpOptions);
  //   // return this.http.delete(`${API_URL}/delete/afm/${afm}`);
  // }
 
}
