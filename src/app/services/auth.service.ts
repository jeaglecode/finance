import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth0: Auth0Service) { }

  async loginOnStartup() {
    const isAuthenticated = await this.auth0.isAuthenticated$.pipe(take(1)).toPromise();

    if (!isAuthenticated) {
      this.auth0.loginWithRedirect();
    }
  }
  get isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }

  login() {
    this.auth0.loginWithRedirect();
  }
  logout(): void {
    this.auth0.logout();
    // this.auth.logout(this.logoutOptions());
  }
  logoutOptions(): any {
    return { returnTo: window.location.origin };
  }

}
