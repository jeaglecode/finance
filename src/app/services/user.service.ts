import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private url = 'https://sore-pike-overshirt.cyclic.app/users';
  // private url = 'http://localhost:3000/users';
  private url = 'https://congruous-literate-branch.glitch.me/users';

  private user: any;

  constructor(private http: HttpClient, private router: Router) { }

  addUser(user: any): Observable<any> {
    return this.http.post(this.url, user).pipe(
      tap((response: any) => {
        this.user = response;
      })
    );
  }

  fetchUsers(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap((response: any) => {
        this.user = response;
      }),
      catchError((error: any) => {
        // Handle the error here
        console.error('An error occurred:', error);
        this.router.navigate(['/error']);
        // You can choose to throw a new error or return a fallback value
        return throwError('Something went wrong');
      })
    );
  }

  getUsers(): Observable<any> {
    if (this.user != null) {
      // If the user is already fetched, return it as an observable.
      return new Observable<any>(observer => {
        observer.next(this.user);
        observer.complete();
      });
    } else {
      // If the user is not fetched yet, fetch it from the backend service.
      return this.http.get(this.url).pipe(
        tap((response: any) => {
          // Update the cached user data with the new data.
          this.user = response;
        }));
    }
  }
}
