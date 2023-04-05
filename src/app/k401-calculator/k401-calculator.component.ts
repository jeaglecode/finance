import { Component } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-k401-calculator',
  templateUrl: './k401-calculator.component.html',
  styleUrls: ['./k401-calculator.component.css']
})
export class K401CalculatorComponent {
  initial401kBalance=  0;
  annualContribution = 8000;
  annualReturn = 7;
  years = 12;
  fees = 2;

  final401kBalance = 0;
  total401kContributions = 0;

  constructor(private userService: UserService) { }

  calculate401k() {
    let balance = this.initial401kBalance;
    for (let i = 0; i < this.years; i++) {
      balance += this.annualContribution;
      balance *= (1 + this.annualReturn/100);
      balance *= (1 - this.fees/100);
    }

    this.final401kBalance = balance;
    this.total401kContributions = this.annualContribution * this.years;
    this.onSubmit()
  }
  user = {
    profileName: 'Test Name Frosty',
    currentAge: 'Test age',
    retirementAge: 'Test retirement age',
    cellPhone: 'Test cell phone',
    email: 'Test email',
    annualPremium: 'Test annual premium',
    yearsIUL: 'Test yearsIUL',
    lumpSum: 'Test lump sum',
    rateOfReturn: 'Test rate of return',
    annualSpendableIncome: 'Test annual spendable income',
    incomeDuration: 'Test income duration',
    incomeTaxRateBeforeRetirement: 'Test income tax rate before retirement',
    feesIUL:  'Test fees IUL',
    paymentFrequencyMonthly: true,
    contribution: 'Test contribution',
    yearsTypical: 'Test years typical',
    currentAccountBalance: 'Test current account balance',
    percentFees: 'Test percent fees',
    employerMatch: 'Test employer match',
    rateOfReturnDuringRetirement: 'Test rate of return during retirement',
    rateOfReturnDuringWorkingYears: 'Test rate of return during working years',
    incomeTaxRateDuringRetirement: 'Test income tax rate during retirement',
    incomeTaxRateDuringWorkingYears: 'Test income tax rate during working years',
  };


  onSubmit() {
    this.userService.addUser(this.user).subscribe(response => {
      console.log(response);
    });
  }

}
