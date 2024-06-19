import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Timesheet } from '../interfaces/mongo-backend';

const API_URL = `${environment.apiURL}/timesheets`;

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  http: HttpClient = inject(HttpClient);

  createTimesheet(timesheet: Timesheet) {
    return this.http.post<{ msg: string }>(`${API_URL}/create`, timesheet);
  }

  getAllTimesheetsByDate(dateOfWork: Date) {
    return this.http.get<Timesheet[]>(`${API_URL}//date/${dateOfWork}`);
  }

  deleteTimesheetById(id: string) { //??? date ή _id ???
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/id/${id}`;
    console.log("url from timesheet.service.ts (deleteTimesheetById):", url)
    return this.http.delete(url, httpOptions);
  }

  updateTimesheetByid(id: string, timesheet: Timesheet) {
    const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    const url = `${API_URL}/id/${id}`;
    console.log("url from client.service.ts (Update):", url)
    return this.http.patch(url, timesheet, httpOptions);
  }

}
