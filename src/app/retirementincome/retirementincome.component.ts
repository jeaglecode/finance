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
  typicalAccountDepleted = false;

  currentAge = 0;
  retirementAge = 0;
  yearsToRetirement = 0;

  typicalSetAge = 0;
  typicalMinAge = 0;
  typicalMaxAge = 0;
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
      this.typicalAnnualSpendableIncome = this.profileData.annualSpendableIncome;
      this.typicalRateOfReturnDuringRetirement = this.profileData.rateOfReturnDuringRetirement;

      this.findTypicalMaxAge();
      this.typicalContributions();
      this.typicalAnnualWithdraw();
      this.calculateTypical();
      console.log(this.profileData);
    });
  }

  changeNumber() {
    this.number = this.profileData.currentAge;
  }

  typicalAgeSelector() {
    console.log("vaule changes")
    if (this.typicalSetAge < this.typicalMinAge) {
      this.typicalSetAge = this.typicalMinAge;
      this.calculateTypicalAccountValue();
    }
    this.calculateTypicalAccountValue();
    this.cumulativeTypicalTotalSpendableIncome();
  }

  typicalContributions() {
    this.typicalTotalContribution = this.profileData.contribution * this.yearsToRetirement;
  }

  typicalAnnualWithdraw() {
    let inverseInterestRate: number;
    inverseInterestRate = this.profileData.incomeTaxRateDuringRetirement / 100;
    inverseInterestRate = 1 - inverseInterestRate;
    this.typicalAnnualDrawFromAccount = this.profileData.annualSpendableIncome / inverseInterestRate;
  }

  calculateTypical() {
    let balance = this.profileData.currentAccountBalance;
    for (let i = 0; i < this.profileData.yearsTypical; i++) {
      balance += this.profileData.contribution;
      balance *= (1 + this.profileData.rateOfReturnDuringWorkingYears / 100);
      balance *= (1 - this.profileData.percentFees / 100);
    }
    return this.typicalAccountValue = balance;
  }

  cumulativeTypicalTotalSpendableIncome() {
    let yearIntoRetirement = this.typicalSetAge - this.retirementAge;
    if (this.typicalAccountDepleted) {
      this.typicalSpendableIncome = this.profileData.annualSpendableIncome * (this.typicalMaxAge - this.retirementAge - 1);
    } else {
      this.typicalSpendableIncome = yearIntoRetirement * this.profileData.annualSpendableIncome;
    }
  }

  findTypicalMaxAge() {
    this.typicalAnnualWithdraw();
    let accountValue = this.calculateTypical();

    let yearsForIteration = 125;
    let rateOfReturn = this.profileData.rateOfReturnDuringRetirement / 100;
    let annualFees = this.profileData.percentFees / 100;

    let accountValueWithRateOfReturn
    let accountValueWithAnnualFee
    let yearsUntilUntilAccountDepleted = 0;

    for (let i = 0; i < yearsForIteration; i++) {
      yearsUntilUntilAccountDepleted = yearsUntilUntilAccountDepleted + 1;
      accountValueWithRateOfReturn = accountValue + (accountValue * rateOfReturn);
      accountValueWithAnnualFee = accountValueWithRateOfReturn - (accountValueWithRateOfReturn * annualFees);
      accountValue = accountValueWithAnnualFee;
      accountValue = accountValue - this.typicalAnnualDrawFromAccount;
      if (accountValue <= 0) {
        this.typicalMaxAge = yearsUntilUntilAccountDepleted + this.retirementAge;
        break;
      } else {
        this.typicalMaxAge = 125;
      }
    }
    return this.typicalMaxAge;
  }

  calculateTypicalAccountValue() {
    let accountValue = this.calculateTypical();
    let yearsIntoRetirement = this.typicalSetAge - this.retirementAge;
    let rateOfReturn = this.profileData.rateOfReturnDuringRetirement / 100;
    let annualFees = this.profileData.percentFees / 100;
    let accountValueWithRateOfReturn
    let accountValueWithAnnualFee
    let yearsUntilUntilAccountDepleted = 0;

    for (let i = 0; i < yearsIntoRetirement; i++) {
      console.log(i);
      yearsUntilUntilAccountDepleted = yearsUntilUntilAccountDepleted + 1;
      accountValueWithRateOfReturn = accountValue + (accountValue * rateOfReturn);
      accountValueWithAnnualFee = accountValueWithRateOfReturn - (accountValueWithRateOfReturn * annualFees);
      accountValue = accountValueWithAnnualFee;
      accountValue = accountValue - this.typicalAnnualDrawFromAccount;

      if (accountValue <= 0) {
        this.typicalAccountDepleted = true;
        this.typicalAccountValue = 0;
        break;
      }
    }

    this.typicalAccountValue = accountValue;

    if (yearsIntoRetirement === 0) {
      this.typicalAccountValue = this.calculateTypical();
    }
    if (this.typicalAccountValue <= 0) {
      this.typicalAccountDepleted = true;
      this.typicalAccountValue = 0;
      this.typicalAnnualSpendableIncome = 0;
      this.typicalSetAge = this.typicalMaxAge;
    } else {
      this.typicalAccountDepleted = false;
      this.typicalAnnualSpendableIncome = this.profileData.annualSpendableIncome;
    }
  }
}
