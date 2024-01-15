import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-k401-calculator',
  templateUrl: './k401-calculator.component.html',
  styleUrls: ['./k401-calculator.component.css']
})
export class K401CalculatorComponent implements OnInit{
  initial401kBalance=  0;
  annualContribution = 8000;
  annualReturn = 7;
  years = 12;
  fees = 2;
  final401kBalance = 0;
  total401kContributions = 0;

  finalIULCashValue=0;
  totalIULContributions=0;

  public profileData: any = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.profileData = users;
      this.calculate401k();
      this.calculateIUL();
      console.log("profile Data", this.profileData);
    });

  }

  calculate401k() {
    let balance = this.profileData.currentAccountBalance;
    for (let i = 0; i < this.profileData.yearsTypical; i++) {
      balance += this.profileData.contribution;
      balance *= (1 + this.profileData.rateOfReturnDuringWorkingYears/100);
      balance *= (1 - this.profileData.percentFees/100);
    }

    this.final401kBalance = balance;
    this.total401kContributions = this.profileData.contribution * this.profileData.yearsTypical;
    // this.onSubmit()
  }

  calculateIUL() {
    console.log('calculateIUL() called');
    let balance = 0 + this.profileData.lumpSum;
    for (let i = 0; i < this.profileData.yearsIUL; i++) {
      balance *= (1 + this.profileData.rateOfReturn / 100);
      balance -= this.profileData.feesIUL;
      balance += this.profileData.annualPremium;

    }
    console.log('balance: ', balance);
    this.finalIULCashValue = balance;
    this.totalIULContributions = this.profileData.annualPremium * this.profileData.yearsIUL;

  }



}
