import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Timesheet } from '../interfaces/mongo-backend';
import { map } from 'rxjs';

const API_URL = `${environment.apiURL}/timesheets`;

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  http: HttpClient = inject(HttpClient);

  createTimesheet(timesheet: Timesheet) {
    return this.http.post<{ msg: string }>(`${API_URL}/create`, timesheet);
  }

  getAllTimesheets() {
    // return this.http.get<Timesheet[]>(`${API_URL}/`);
    
    return this.http.get<Timesheet[]>(`${API_URL}/`).pipe(
      // map((res:any[])=>{
      //   res.forEach(x=>x.dateOfWork=`${new Date(x.dateOfWork).getDay()} / ${new Date(x.dateOfWork).getMonth()} / ${new Date(x.dateOfWork).getFullYear()}`)
      //   return res;
      // })
      map((res:any[])=>{
        res.forEach(x=>x.dateOfWork=new Date(x.dateOfWork).toDateString().substring(0, 15).toLocaleString())      
        return res;
      })
    )
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

}
 