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

  retirementAge = 0;// Can be typical or IUL

  ageClick = false;
  elementId = "";
  selectorTypical = false;
  retireAgeSelected = false;
  ageSelected = false;


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


  IULAccountDepleted = false;
  IULSetAge = 0;
  IULMinAge = 0;
  IULMaxAge = 110;

  IULNewRateOfReturnAfterRetirement = 0; //new
  IULLoanPercentFee = 0; //new
  IULFlatFee = 0;
  IULSuccessful = false;






  readonly IULTaxRateDuringRetirement = 0;
  IULAnnualDrawAgainstAccount = 0;

  IULTotalPremiumPaid = 0;
  IULAccountValue = 0;
  IULAnnualSpendableIncome = 0;
  IULTotalSpendableIncome = 0;
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

      this.typicalTaxRateDuringRetirement = this.profileData.incomeTaxRateDuringRetirement;
      this.typicalAnnualSpendableIncome = this.profileData.annualSpendableIncome;
      this.typicalRateOfReturnDuringRetirement = this.profileData.rateOfReturnDuringRetirement;
      this.findTypicalMaxAge();
      this.typicalContributions();
      this.typicalAnnualWithdraw();
      this.calculateTypical();


      this.IULNewRateOfReturnAfterRetirement = this.profileData.rateOfReturnDuringRetirementIUL;
      this.IULSetAge = this.profileData.retirementAge;
      this.IULAnnualDrawAgainstAccount = this.profileData.annualSpendableIncome;
      this.IULTotalPremiumPaid = this.profileData.annualPremium;
      this.IULAnnualSpendableIncome = this.profileData.annualSpendableIncome;
      this.IULMinAge = this.retirementAge;

      this.calculateIUL();
      // this.calculateIULAccountValue()//
      console.log(this.profileData);
    });
  }


  IULAgeSelectorField() {
    console.log("vaule changes")
    if (this.IULSetAge < this.IULMinAge) {
      this.IULSetAge = this.IULMinAge;
      // this.calculateIULAccountValue();
    }
    if(this.IULSetAge > this.IULMaxAge ){
      this.IULSetAge = this.IULMaxAge;

    }
    this.calculateIULAccountValue();
    this.cumulativeIULTotalSpendableIncome();
    this.IULCheckForSuccess();

    if(this.retireAgeSelected){

      // if(this.IULSetAge <= this.typicalMaxAge) {
      this.typicalSetAge  = this.IULSetAge;
      this.typicalAgeSelector();
      // }
    }


  }

  IULCheckForSuccess(){
    if (this.IULSetAge >= this.typicalMaxAge) {
      this.IULSuccessful = true;
    }
    if(this.IULSetAge < this.typicalMaxAge) {
      this.IULSuccessful = false;
    }

    console.log(this.IULSuccessful);

  }





  calculateIULAccountValue() {
    //////DELETE THIS
    // this.IULTotalSpendableIncome=10000;//
    let accountValue = this.calculateIUL();

    let yearsIntoRetirement = this.IULSetAge - this.retirementAge;
    let rateOfReturn = this.IULNewRateOfReturnAfterRetirement / 100;
    let IULPercentFees = this.profileData.feesIULPercent; //1 percent this was change to flat fee and didn't change the name
    let IULLoanPercent = this.profileData.loanPercentForIUL / 100; //2 percent
    let IULLoanFee = 0;
    let yearsUntilUntilAccountDepleted = 0;
    let staticAnnualSpend = this.profileData.annualSpendableIncome;

    // accountValue += accountValue * rateOfReturn;
    // accountValue -= accountValue * IULPercentFees;
    // IULLoanFee = this.IULTotalSpendableIncome * IULLoanPercent;
    // accountValue -= IULLoanFee;
    for (let i = 0; i < yearsIntoRetirement; i++) {
      console.log(i);
      yearsUntilUntilAccountDepleted = yearsUntilUntilAccountDepleted + 1;
      accountValue += accountValue * rateOfReturn;
      console.log(accountValue);
      accountValue = accountValue - IULPercentFees;
      console.log(accountValue);
      IULLoanFee = (staticAnnualSpend * (i + 1)) * IULLoanPercent;
      console.log(IULLoanFee);
      accountValue -= IULLoanFee;
      console.log('ending account' + accountValue);

      // accountValueWithRateOfReturn = accountValue + (accountValue * rateOfReturn);
      // accountValueWithAnnualFee = accountValueWithRateOfReturn - (accountValueWithRateOfReturn * annualFees);
      // accountValue = accountValueWithAnnualFee;
      // accountValue = accountValue - this.typicalAnnualDrawFromAccount;

      if (accountValue <= 0) {
        this.IULAccountDepleted = true;
        this.IULAccountValue = 0;
        break;
      }
    }

    this.IULAccountValue = accountValue;
    console.log(accountValue);

  }

  calculateIUL() {
    let balance = this.profileData.lumpSum;
    for (let i = 0; i < this.profileData.yearsIUL; i++) {
      balance *= (1 + this.profileData.rateOfReturn / 100);
      balance -= this.profileData.feesIUL;
      balance += this.profileData.annualPremium;
    }
    return this.IULAccountValue = balance;
  }

  cumulativeIULTotalSpendableIncome() {
    let yearIntoRetirement = this.IULSetAge - this.retirementAge;
    if (this.IULAccountDepleted) {
      this.IULTotalSpendableIncome = this.profileData.annualSpendableIncome * (this.IULMaxAge - this.retirementAge - 1);
      ///reserved the overload of a user spending more than they have in their account
    } else {
      this.IULTotalSpendableIncome = yearIntoRetirement * this.profileData.annualSpendableIncome;
     }
  }

  typicalAgeSelector() {
    console.log("vaule changes")
    if (this.typicalSetAge < this.typicalMinAge) {
      this.typicalSetAge = this.typicalMinAge;
      this.calculateTypicalAccountValue();
    }
    this.calculateTypicalAccountValue();
    this.cumulativeTypicalTotalSpendableIncome();

    if(this.ageSelected){

      this.IULSetAge = this.typicalSetAge;
      this.IULAgeSelectorField();

    }


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

  ageClicked(event: Event){

    this.elementId = (event.target as Element).id;
    console.log(this.elementId);
    this.ageClick = !this.ageClick;

    if(this.elementId === 'age' && this.ageSelected) {
      this.ageSelected = false;

    }else if(this.elementId === 'age' && !this.ageSelected){
      this.ageSelected = true;
      this.retireAgeSelected = false;
      this.IULSetAge = this.typicalSetAge;
      // this.selectorTypical = true;
      this.IULAgeSelectorField();

    }


    if(this.elementId === 'retirementAge' && this.retireAgeSelected) {
      this.retireAgeSelected = false;

    }else if(this.elementId === 'retirementAge' && !this.retireAgeSelected){
      this.retireAgeSelected = true;
      this.ageSelected = false;
      this.typicalSetAge = this.IULSetAge;
      this.typicalAgeSelector();
    }

  }

}
