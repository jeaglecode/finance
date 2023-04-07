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

  currentAge = 0;
  retirementAge = 0;
  yearsToRetirement = 0;











  typicalSetAge = 0;
  typicalMinAge = 0;
  typicalRateOfReturnDuringRetirement = 0;
  typicalAnnualDrawFromAccount = 0;
  typicalTaxRateDuringRetirement = 0;
  typicalTotalContribution = 0;

  typicalAccountValue = 0;
  typicalAnnualSpendableIncome = 0;
  typicalSpendableIncome = 0;

  IULTaxRateDuringRetirement = 0;
  IULAnnualDrawAgainstAccount = 0;

  IULTotalPremiumPaid = 0;
  IULAccountValue = 0;
  IULAnnualSpendableIncome = 0;
  IULSpendableIncome = 0;
  IULDeathBenefit = 0;


constructor(private userService: UserService) {
}



  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.profileData = users;
      this.typicalSetAge = this.profileData.retirementAge;
      this.typicalMinAge = this.profileData.retirementAge;
      this.retirementAge = this.profileData.retirementAge;
      this.currentAge = this.profileData.currentAge;
      this.retirementAge = this.profileData.retirementAge;
      this.yearsToRetirement = this.profileData.yearsTypical;

      this.typicalTaxRateDuringRetirement = this.profileData.incomeTaxRateDuringWorkingYears;
      // this.typicalAnnualDrawFromAccount = this.profileData.annualSpendableIncome;
      this.typicalRateOfReturnDuringRetirement = this.profileData.rateOfReturnDuringRetirement;


      this.typicalContributions();
      this.typicalAnnualWithdraw();

      console.log(this.profileData);
    });

  }

  changeNumber() {
    this.number = this.profileData.currentAge;
  }

  typicalAgeSelector(){
      if(this.typicalSetAge < this.typicalMinAge){
        this.typicalSetAge = this.typicalMinAge;
      }
  }

  typicalContributions() {
    this.typicalTotalContribution = this.profileData.contribution * this.yearsToRetirement;
  }

  typicalAnnualWithdraw(){
    let inverseInterestRate;
    inverseInterestRate = this.profileData.incomeTaxRateDuringRetirement / 100;
    inverseInterestRate = 1 -  inverseInterestRate;
    this.typicalAnnualDrawFromAccount = this.profileData.annualSpendableIncome / inverseInterestRate;

  }

}
