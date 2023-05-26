import { Component } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent {
  public profileData: any = [];

  currentAge = 0;
  retirementAge = 0;// Can be typical or IUL
  typicalAnnualContribution = 0;
  typicalCurrentAccountBalance = 0;
  typicalTaxRateBeforeRetirement = 0;





  IULAnnualContribution = 0;
  IULLumpSumPremium = 0;
  IULTaxRateBeforeRetirement = 0;

  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.profileData = users;
      this.retirementAge = this.profileData.retirementAge;
      this.typicalAnnualContribution = this.profileData.contribution;
      this.typicalCurrentAccountBalance = this.profileData.currentAccountBalance;
      this.typicalTaxRateBeforeRetirement = this.profileData.incomeTaxRateDuringWorkingYears;

      console.log(this.profileData);







      this.IULAnnualContribution = this.profileData.annualPremium
      this.IULLumpSumPremium = this.profileData.lumpSum;
      this.IULTaxRateBeforeRetirement = this.profileData.incomeTaxRateBeforeRetirement;


    });
  }



}
