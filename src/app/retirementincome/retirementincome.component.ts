import { Component } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-retirementincome',
  templateUrl: './retirementincome.component.html',
  styleUrls: ['./retirementincome.component.css']
})
export class RetirementincomeComponent {
  public profileData: any = [];
  number = 0;

constructor(private userService: UserService) {
}



  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.profileData = users;
      this.number = this.profileData.currentAge;

      console.log(this.profileData);
    });

  }


  changeNumber() {
    this.number = this.profileData.currentAge;

  }

}
