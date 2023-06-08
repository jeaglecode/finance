import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SP500DATAService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>('assets/sp500-annual-returns.json');
  }


  getDataFromStartToEnd(startYear: number, endYear: number): Observable<any[]> {
    return this.http.get<any[]>('assets/sp500-annual-returns.json').pipe(
      map(data => data.filter(item => {
        const itemYear = new Date(item.date).getFullYear();
        return itemYear >= startYear && itemYear <= endYear;
      }))
    );
  }




}
