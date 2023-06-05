import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit{
  public profileData: any = [];
  currentAge = 0;
  retirementAge = 0;// Can be typical or IUL
  ageClick = false;
  elementId = "";
  selectorTypical = false;
  retireAgeSelected = false;
  ageSelected = false;

  typicalAnnualContribution = 0;
  typicalCurrentAccountBalance = 0;
  typicalRateOfReturn = 0;
  typicalFees = 0;
  typicalAnnualDrawFromAccount = 0;
  typicalSetAge = 0;
  typicalMinAge = 0;
  typicalMaxAge = 0;
  typicalAccountValue = 0;
  typicalRateOfReturnDuringRetirement = 0;
  UITypicalAnnualFees = 0;
  UITypicalTotalFees = 0;
  typicalOutOfAgeRange = false;





  IULAnnualPremium = 0;
  IULLumpSumPremium = 0;
  IULRateOfReturn = 0;
  readonly IULMaxAge = 110;
  IULMinAge = 0;
  IULSetAge = 0;
  IULFlatFee = 0;
  UIIULAnnualFees = 0;
  IULFeesIULPercent = 0;
  UIIULTotalFees = 0;
  IULRateOfReturnDuringRetirement = 0;
  IULSuccessful = false;




  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUsers().subscribe((users: any) => {
      this.profileData = users;
      this.currentAge = this.profileData.currentAge;
      this.retirementAge = this.profileData.retirementAge;
      this.typicalAnnualContribution = this.profileData.contribution;
      this.typicalCurrentAccountBalance = this.profileData.currentAccountBalance;
      this.typicalRateOfReturn = this.profileData.rateOfReturnDuringWorkingYears;
      this.typicalFees = this.profileData.percentFees;
      this.typicalMinAge = this.profileData.currentAge;
      this.typicalSetAge = this.profileData.currentAge;
      this.typicalRateOfReturnDuringRetirement = this.profileData.rateOfReturnDuringRetirement;
      // console.log(this.profileData);
      this.calculateAnnualFees();



      this.IULAnnualPremium = this.profileData.annualPremium;
      this.IULLumpSumPremium = this.profileData.lumpSum;
      this.IULRateOfReturn = this.profileData.rateOfReturn;
      this.IULMinAge = this.profileData.currentAge;
      this.IULSetAge = this.profileData.currentAge;
      this.IULFlatFee = this.profileData.feesIUL;
      this.IULFeesIULPercent = this.profileData.feesIULPercent;
      this.IULRateOfReturnDuringRetirement = this.profileData.rateOfReturnDuringRetirementIUL;

      this.findTypicalMaxAge();
      this.IULCalculateFess();
      // console.log(this.typicalMaxAge);



    });
    }

  typicalAgeSelector(){

    // if(this.elementId === "retirementAge" && this.ageClick && !this.selectorTypical){
    //   this.elementId = "age";
    //   this.selectorTypical = true;
    // }

    if(this.typicalSetAge > this.typicalMaxAge) {
      this.typicalSetAge = this.typicalMaxAge;

    }
    if(this.typicalSetAge < this.typicalMinAge) {
      this.typicalSetAge = this.typicalMinAge;
    }

    // if(this.ageClick){
    //   this.IULSetAge  = this.typicalSetAge;
    //   this.IULAgeSelector();
    // }


    this.calculateAnnualFees();
    this.typicalOutOfAgeRangeAlgo();

    if(this.ageSelected){

        this.IULSetAge = this.typicalSetAge;
        this.IULAgeSelector()

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



  calculateAnnualFees(){

    let iteration = this.typicalSetAge - this.typicalMinAge + 1;
    // console.log(iteration);

    this.calculateUntilRetirement(iteration);


  }


  calculateUntilRetirement(iteration: number) {
    let yearsUntilRetirement = this.retirementAge - this.currentAge;
    let annualContribution = 0;
    let annualFees = 0;
    let totalFees = 0;
    // console.log(yearsUntilRetirement);
    // console.log(annualContribution);

    for (let i = 0; i < iteration; i++) {


      annualContribution = annualContribution + this.typicalAnnualContribution;

      if (i >= yearsUntilRetirement) {
        annualContribution = annualContribution - this.typicalAnnualDrawFromAccount;
        // console.log(this.typicalAnnualDrawFromAccount);
        annualContribution = annualContribution + (annualContribution * (this.typicalRateOfReturnDuringRetirement / 100));

      }

      else
      {

        annualContribution = annualContribution + (annualContribution * (this.typicalRateOfReturn / 100));
      }


      annualFees = annualContribution * (this.typicalFees / 100);
      if (annualFees < 0) {
        annualFees = 0;
      }

      annualContribution = annualContribution - annualFees;

      totalFees = totalFees + annualFees;
      this.UITypicalAnnualFees = annualFees;
      this.UITypicalTotalFees = totalFees;
      // this.typicalCurrentAccountBalance = this.typicalCurrentAccountBalance + annualContribution;
      // this.typicalCurrentAccountBalance = this.typicalCurrentAccountBalance + (this.typicalCurrentAccountBalance * (this.typicalRateOfReturn / 100));
      // this.typicalCurrentAccountBalance = this.typicalCurrentAccountBalance - (this.typicalCurrentAccountBalance * (this.typicalFees / 100));
      // console.log(annualContribution);
      // console.log(annualFees);
      // console.log(i);

    }




  }















  IULAgeSelector() {


    // if(this.elementId === "age" && this.ageClick && this.selectorTypical){
    //   this.elementId = "retirementAge";
    //   this.selectorTypical = false;
    // }

    if(this.IULSetAge > this.IULMaxAge) {
      this.IULSetAge = this.IULMaxAge;

    }
    if(this.IULSetAge < this.IULMinAge) {
      this.IULSetAge = this.IULMinAge;
    }






    let iteration = this.IULSetAge - this.IULMinAge + 1;
    // console.log(iteration);

    this.IULCalculateUntilRetirement(iteration);
    this.IULCheckForSuccess();

    if(this.retireAgeSelected){

      // if(this.IULSetAge <= this.typicalMaxAge) {
        this.typicalSetAge  = this.IULSetAge;
        this.typicalAgeSelector();
      // }
    }




  }


  IULCheckForSuccess() {

    if (this.IULSetAge >= this.typicalMaxAge) {
      this.IULSuccessful = true;
    }
    if(this.IULSetAge < this.typicalMaxAge) {
      this.IULSuccessful = false;
    }

    // console.log(this.IULSuccessful);

  }
ageClicked(event: Event) {

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
         this.IULAgeSelector();


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




     // if(this.elementId === 'age' && this.ageClick) {
     //   this.IULSetAge = this.typicalSetAge;
     //   this.selectorTypical = true;
     //   this.IULAgeSelector();
     // }
     //  else if(this.elementId === 'retirementAge' && this.ageClick) {
     //
     //    this.retireAgeSelected = true;
     //   this.typicalSetAge = this.IULSetAge;
     //   this.selectorTypical = false;
     //   this.typicalAgeSelector();
     //
     // }





  IULCalculateFess() {
    let iteration = this.IULSetAge - this.IULMinAge + 1;
    // console.log(iteration);
    this.IULCalculateUntilRetirement(iteration);

  }



  IULCalculateUntilRetirement(iteration: number) {

    let yearsUntilRetirement = this.retirementAge - this.currentAge;
    let annualPremium = 0;
    let annualFlatFee = this.IULFlatFee;
    let annualPercentFee = this.IULFeesIULPercent;
    let fee;
    let totalFees = 0;
    let loanFee = (this.profileData.loanPercentForIUL / 100) * this.profileData.annualSpendableIncome;

    // console.log(yearsUntilRetirement);

    for (let i = 0; i < iteration; i++) {

      // console.log(i)

      if(i >= yearsUntilRetirement) {

        annualPremium = annualPremium + (annualPremium * (this.IULRateOfReturnDuringRetirement / 100));
        // console.log(annualPremium);
        fee = annualPremium * (annualPercentFee / 100);

        // console.log(fee)
        annualPremium = annualPremium - (fee);
        annualPremium = annualPremium - (loanFee);
        // console.log(annualPremium);
        // console.log('in the if statement')

        totalFees = totalFees + fee;
      }

      else {

        annualPremium = annualPremium + (annualPremium * (this.IULRateOfReturn / 100));
        annualPremium = annualPremium - (annualFlatFee);

        annualPremium = annualPremium + this.IULAnnualPremium;
        totalFees = totalFees + annualFlatFee;

      }



      // console.log(annualPremium)
      this.UIIULAnnualFees = annualFlatFee;


      this.UIIULTotalFees = totalFees;

    }


    // console.log(yearsUntilRetirement);

  }










    //********************************************************** Code must be refactored **************************************************************


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
