import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Client } from '../interfaces/mongo-backend';

const API_URL = `${environment.apiURL}/clients`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http: HttpClient = inject(HttpClient);

  createClient(client: Client) {
    return this.http.post<{ msg: string }>(`${API_URL}/create`, client);
  }

  getAllClients() {
    return this.http.get<Client[]>(`${API_URL}/`);
  }

  deleteClient(afm: string) { 
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/afm/${afm}`;
    console.log("url from client.service.ts (Delete):", url)
    return this.http.delete(url, httpOptions);
  }

  updateClientByAfm(afm: string, client: Client) {
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/afm/${afm}`;
    console.log("url from client.service.ts (Update):", url)
    return this.http.patch(url, client, httpOptions);
  }

  }
