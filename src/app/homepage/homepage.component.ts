import { Component, Renderer2,  OnInit  } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  constructor(private renderer: Renderer2, public navbarService: NavbarService) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'my-class');
    this.navbarService.showNavbar.next(false);
  }


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'my-class');
    this.navbarService.showNavbar.next(true);
  }

}
