import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://financeserver.onrender.com/users';
  // private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    return this.http.post(this.url, user);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

}
