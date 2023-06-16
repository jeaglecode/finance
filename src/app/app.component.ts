import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(public authService: AuthService, public navbarService: NavbarService) {}
  title = 'finance';

  ngOnInit() {
    this.authService.loginOnStartup();



  }



}
