import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { K401CalculatorComponent } from './k401-calculator/k401-calculator.component';
import { IulCalculatorComponent } from './iul-calculator/iul-calculator.component';
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RetirementincomeComponent } from './retirementincome/retirementincome.component';
import { TaxesComponent } from './taxes/taxes.component';
import { FeesComponent } from './fees/fees.component';

@NgModule({
  declarations: [
    AppComponent,
    K401CalculatorComponent,
    IulCalculatorComponent,
    NavbarComponent,
    ProfilesComponent,
    RetirementincomeComponent,
    TaxesComponent,
    FeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
