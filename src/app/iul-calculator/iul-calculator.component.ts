import { Component } from '@angular/core';

@Component({
  selector: 'app-iul-calculator',
  templateUrl: './iul-calculator.component.html',
  styleUrls: ['./iul-calculator.component.css']
})
export class IulCalculatorComponent {
  initialIULPremium = 0;
  annualIULContribution = 6000;
  iulInterestRate = 7;
  iulYears = 12;
  iulFees = 650;

  finalIULCashValue=0;
  totalIULContributions=0;


  calculateIUL() {
    let balance = this.initialIULPremium;
    for (let i = 0; i < this.iulYears; i++) {
      balance += this.annualIULContribution;
      balance *= (1 + this.iulInterestRate / 100);
      balance -= this.iulFees;

    }

    this.finalIULCashValue = balance;
    this.totalIULContributions = this.annualIULContribution * this.iulYears;

  }

}
