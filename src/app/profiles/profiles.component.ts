import { Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit{
  public fetchedUsers: any = [];
  showUpdateProfileMessage= false;
  // profileName!: string;
  // currentAge!: number;
  // retirementAge!: number;
  // cellPhone = '619-567-6565';
  // email = 'email@email.com';
  // annualPremium = 6000;
  // lumpSum = 0;
  // rateOfReturn = 7;
  // annualSpendableIncome = 25000;
  // incomeDuration = 0;
  // incomeTaxRateBeforeRetirement = 25;
  // feesIUL =  650;
  // feesIULPercent = 1;
  // paymentFrequency = 'annually';
  // contribution = 8000;
  // currentAccountBalance = 0;
  // percentFees =  2;
  // employerMatch = 0;
  // rateOfReturnDuringRetirement = 3;
  // rateOfReturnDuringWorkingYears = 7;
  // incomeTaxRateDuringRetirement = 25;
  // incomeTaxRateDuringWorkingYears = 25;
  //
  // yearsIUL = this.retirementAge - this.currentAge;
  // yearsTypical = this.retirementAge - this.currentAge;

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getUsers().subscribe((users: any) => {
      this.fetchedUsers = users;
      this.yearsBetweenAges()
      console.log(this.fetchedUsers);
    });













    // this.getUsers();
  }



  setUserData(user:any){
    this.user = {
      profileName: user.profileName,
      currentAge: user.currentAge,
      retirementAge: user.retirementAge,
      cellPhone: user.cellPhone,
      email: user.email,
      annualPremium: user.annualPremium,
      yearsIUL: user.yearsIUL,
      lumpSum: user.lumpSum,
      rateOfReturn: user.rateOfReturn,
      annualSpendableIncome: user.annualSpendableIncome,
      incomeDuration: user.incomeDuration,
      incomeTaxRateBeforeRetirement: user.incomeTaxRateBeforeRetirement,
      feesIUL: user.feesIUL,
      paymentFrequency: user.paymentFrequency,
      contribution: user.contribution,
      yearsTypical: user.yearsTypical,
      currentAccountBalance: user.currentAccountBalance,
      percentFees: user.percentFees,
      employerMatch: user.employerMatch,
      rateOfReturnDuringRetirement: user.rateOfReturnDuringRetirement,
      rateOfReturnDuringWorkingYears: user.rateOfReturnDuringWorkingYears,
      incomeTaxRateDuringRetirement: user.incomeTaxRateDuringRetirement,
      incomeTaxRateDuringWorkingYears: user.incomeTaxRateDuringWorkingYears,
    };

}

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any[]) => {
        this.user = response;
        this.fetchedUsers = response;
        console.log(this.user);
        this.setUserData(this.user)
        console.log(this.user);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  // async getUsers(): Promise<void> {
  //   try {
  //     const response = await this.userService.getUsers().toPromise();
  //     this.user = response;
  //     this.fetchedUsers = response;
  //     console.log(this.user);
  //     this.setUserData(this.user);
  //     console.log(this.user);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // }



  yearsBetweenAges()  {
    // this.yearsIUL = this.retirementAge - this.currentAge;
    this.fetchedUsers.yearsIUL = this.fetchedUsers.retirementAge - this.fetchedUsers.currentAge;
    this.fetchedUsers.yearsTypical = this.fetchedUsers.retirementAge - this.fetchedUsers.currentAge;
    // console.log( this.currentAge);
    // this.yearsTypical = this.retirementAge - this.currentAge;
  }

  saveProfile() {
    // this.yearsIUL = this.retirementAge - this.currentAge;
    // this.yearsTypical = this.retirementAge - this.currentAge;
    // this.setUserData();
    console.log(this.fetchedUsers);
    this.userService.addUser(this.fetchedUsers).subscribe(response => {
      this.showMessageAndAutoHide()
      console.log(response);
    });
     }
  showMessageAndAutoHide() {
    this.showUpdateProfileMessage = true;
    setTimeout(() => {
      this.showUpdateProfileMessage = false;
    }, 1000); // Adjust the duration (in milliseconds) as needed
  }
}
