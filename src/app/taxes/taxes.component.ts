import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";


@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.css']
})
export class TaxesComponent implements OnInit{

  // retirementMaxAge: number = 0;

  public profileData: any = [];

  currentAge = 0;
  retirementAge = 0;// Can be typical or IUL
  typicalAnnualContribution = 0;
  typicalCurrentAccountBalance = 0;
  typicalTaxRateBeforeRetirement = 0;
  readonly typicalPlanAnnualTaxesDeferred = 0; //will always be 0 for typical plan
  typicalPlanAnnualTaxesDeferredBeforeRetirement = 0;
  typicalAnnualSpendableIncomeNet = 0;
  typicalAnnualSpendableIncomeGross = 0;
  typicalTotalTaxesDeferredBeforeRetirement = 0;
  typicalTotalRate = 0;
  typicalAnnualIncomeTaxPaid = 0;
  typicalTotalIncomeTaxPaid = 0;
  typicalSetAge = 0;
  typicalMinAge = 0;
  typicalMaxAge = 0;

  typicalAnnualDrawFromAccount = 0;
  typicalAccountValue = 0;
  typicalOutOfAgeRange = false;
  typicalTotalTaxesDeferredIsNegative = false;






  IULAnnualContribution = 0;
  IULLumpSumPremium = 0;
  IULTaxRateBeforeRetirement = 0;
  IULAnnualTaxesPaid = 0;
  readonly IULMaxAge = 110;
  IULMinAge = 0;
  IULSetAge = 0;
  UIIULTotalTaxPaidBeforeRetirement = 0;
  UIIULAnnualSpendableIncomeInRetirement = 0;
  UIIULTotalTaxesPaidBeforeRetirement = 0;
  readonly UIIULTotalRate = 0;
  UIIULAnnualIncomeTaxSaved = 0;
  UIIULTotalIncomeTaxSaved = 0;


  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.getUsers().subscribe((users: any) => {
      this.profileData = users;

      this.currentAge = this.profileData.currentAge;
      this.retirementAge = this.profileData.retirementAge;
      this.typicalAnnualContribution = this.profileData.contribution;
      this.typicalCurrentAccountBalance = this.profileData.currentAccountBalance;
      this.typicalTaxRateBeforeRetirement = this.profileData.incomeTaxRateDuringWorkingYears;

      this.typicalPlanAnnualTaxesDeferredBeforeRetirement = this.calculateAnnualTaxesDeferred(this.typicalAnnualContribution,
        this.typicalTaxRateBeforeRetirement, this.currentAge, this.retirementAge);
      this.typicalTotalTaxesDeferredBeforeRetirement = this.typicalPlanAnnualTaxesDeferredBeforeRetirement;
      this.calculateTypicalAnnualSpendingGross();
      this.typicalAnnualSpendableIncomeNet = this.profileData.annualSpendableIncome;
      this.typicalTotalTaxesDeferredBeforeRetirement = this.typicalPlanAnnualTaxesDeferredBeforeRetirement;
      this.typicalTotalRate = this.profileData.incomeTaxRateDuringRetirement;
      this.typicalAnnualIncomeTaxPaid = this.typicalAnnualSpendableIncomeGross - this.typicalAnnualSpendableIncomeNet;
      this.typicalTotalIncomeTaxPaid = 0;
      this.typicalSetAge = this.profileData.retirementAge;
      this.typicalMinAge = this.profileData.retirementAge;
      console.log(this.typicalMinAge)

      this.typicalMaxAge = this.checkTypicalMaxAge();


      this.findTypicalMaxAge();


      console.log(this.typicalMaxAge);

      this.IULAnnualContribution = this.profileData.annualPremium
      this.IULLumpSumPremium = this.profileData.lumpSum;
      this.IULTaxRateBeforeRetirement = this.profileData.incomeTaxRateBeforeRetirement;
      this.IULMinAge = this.typicalMinAge;
      this.IULSetAge = this.typicalSetAge;
      this.IULCalculateTaxes();
      this.UIIULAnnualSpendableIncomeInRetirement = this.profileData.annualSpendableIncome;
      this.UIIULTotalTaxesPaidBeforeRetirement = this.UIIULTotalTaxPaidBeforeRetirement
      this.UIIULAnnualIncomeTaxSaved = this.typicalAnnualIncomeTaxPaid;

      console.log(this.IULMinAge)

    });
  }

  calculateAnnualTaxesDeferred(typicalAnnualContribution: number, typicalTaxRateBeforeRetirement: number, currentAge: number, retirementAge: number) {
     return typicalAnnualContribution * (typicalTaxRateBeforeRetirement/100) * (retirementAge - currentAge);
}
  calculateTypicalAnnualSpendingGross(): void {


    let inverseInterestRate: number;
    inverseInterestRate = this.profileData.incomeTaxRateDuringWorkingYears / 100;
    inverseInterestRate = 1 - inverseInterestRate;
    this.typicalAnnualSpendableIncomeGross = this.profileData.annualSpendableIncome / inverseInterestRate;
  }

  typicalAgeSelector() {

    if(this.typicalSetAge > this.typicalMaxAge) {
      this.typicalSetAge = this.typicalMaxAge;

    }
    if(this.typicalSetAge < this.typicalMinAge) {
      this.typicalSetAge = this.typicalMinAge;
    }

   this.calculateTotalTaxesDeferredBeforeRetirement();
   this.calculateTotalIncomeTaxPaid();
   this.typicalTotalTaxesDeferredNegative();
   this.typicalOutOfAgeRangeAlgo();

  }

  typicalTotalTaxesDeferredNegative(){

    if(this.typicalTotalTaxesDeferredBeforeRetirement < 0) {
      this.typicalTotalTaxesDeferredIsNegative = true;
    }
    if(this.typicalTotalTaxesDeferredBeforeRetirement >= 0) {
      this.typicalTotalTaxesDeferredIsNegative = false;
    }

  }


  typicalOutOfAgeRangeAlgo(){
    if (this.typicalSetAge === this.typicalMaxAge) {
      this.typicalOutOfAgeRange = true;
    }
    if(this.typicalSetAge !== this.typicalMaxAge) {
      this.typicalOutOfAgeRange = false;
    }

  }


  checkTypicalMaxAge(): number {
      let dividend = this.typicalPlanAnnualTaxesDeferredBeforeRetirement;
      let divisor = this.typicalAnnualIncomeTaxPaid;

      let maxAge = Math.floor(dividend / divisor);
      maxAge = maxAge + this.typicalMinAge + 1;
      return maxAge;

  }

  calculateTotalTaxesDeferredBeforeRetirement() {
    let maxAge = this.checkTypicalMaxAge();
    let currentIteration = this.typicalSetAge - this.typicalMinAge;

    let runningTaxesPaid = currentIteration * this.typicalAnnualIncomeTaxPaid;
    this.typicalTotalTaxesDeferredBeforeRetirement = this.typicalPlanAnnualTaxesDeferredBeforeRetirement - runningTaxesPaid;

    console.log(runningTaxesPaid)

  }

  calculateTotalIncomeTaxPaid() {

    let currentIteration = this.typicalSetAge - this.typicalMinAge;
    let runningTaxesPaid = currentIteration * this.typicalAnnualIncomeTaxPaid;
    this.typicalTotalIncomeTaxPaid = runningTaxesPaid;

  }

//************************************************* Calculations for IUL Plan ******************************************************//

  IULCalculateTaxes() {
    let inverseInterestRate: number;
    inverseInterestRate = this.profileData.incomeTaxRateBeforeRetirement / 100;
    inverseInterestRate = 1 - inverseInterestRate;
    this.IULAnnualTaxesPaid = this.profileData.annualPremium / inverseInterestRate * (this.profileData.incomeTaxRateBeforeRetirement / 100);

    console.log(this.IULMinAge)

    this.UIIULTotalTaxPaidBeforeRetirement = this.IULAnnualTaxesPaid * (this.IULMinAge - this.currentAge);

  }


  IULAgeSelector(){


    if(this.IULSetAge > this.IULMaxAge) {
      this.IULSetAge = this.IULMaxAge;

    }
    if(this.IULSetAge < this.IULMinAge) {
      this.IULSetAge = this.IULMinAge;
    }




    this.IULTotalIncomeTaxSaved();

  }



  IULTotalIncomeTaxSaved() {
    let currentIteration = this.IULSetAge - this.IULMinAge;
    this.UIIULTotalIncomeTaxSaved = currentIteration * this.typicalAnnualIncomeTaxPaid;

  }












//******************************************************************************************* code needs to be refactored ***************************************//

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




}
