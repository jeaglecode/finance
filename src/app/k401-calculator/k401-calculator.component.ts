import { Component } from '@angular/core';

@Component({
  selector: 'app-k401-calculator',
  templateUrl: './k401-calculator.component.html',
  styleUrls: ['./k401-calculator.component.css']
})
export class K401CalculatorComponent {
  initial401kBalance = 0;
  annualContribution = 8000;
  annualReturn = 7;
  years = 12;
  fees = 2;

  final401kBalance = 0;
  total401kContributions = 0;

  calculate401k() {
    let balance = this.initial401kBalance;
    for (let i = 0; i < this.years; i++) {
      balance += this.annualContribution;
      balance *= (1 + this.annualReturn/100);
      balance *= (1 - this.fees/100);
    }








    this.final401kBalance = balance;
    this.total401kContributions = this.annualContribution * this.years;
  }
}
