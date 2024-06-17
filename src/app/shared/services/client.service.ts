import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const API_URL = `${environment.apiURL}/clients`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http: HttpClient = inject(HttpClient);

  createClient(worker: Worker) {
    return this.http.post<{ msg: string }>(`${API_URL}/create`, worker);
  }

  getAllClients() {
    return this.http.get<Worker[]>(`${API_URL}/`);
  }

  deleteClient(afm: string) { 
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/afm/${afm}`;
    console.log("url from worker.service.ts (Delete):", url)
    return this.http.delete(url, httpOptions);
  }

  updateClientByAfm(afm: string, worker: Worker) {
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
  // updateClientById(id: string, worker: Worker) {
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
