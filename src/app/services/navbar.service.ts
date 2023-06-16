import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public showNavbar: BehaviorSubject<boolean> = new BehaviorSubject(true);
  constructor() { }
}
