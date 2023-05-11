import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { K401CalculatorComponent } from './k401-calculator/k401-calculator.component';
import { FormsModule } from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RetirementincomeComponent } from './retirementincome/retirementincome.component';
import { TaxesComponent } from './taxes/taxes.component';
import { FeesComponent } from './fees/fees.component';
import { UserService } from "./services/user.service";
import { HttpClientModule } from "@angular/common/http";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { ErrorComponent } from './error/error.component'

@NgModule({
  declarations: [
    AppComponent,
    K401CalculatorComponent,
    NavbarComponent,
    ProfilesComponent,
    TaxesComponent,
    RetirementincomeComponent,
    FeesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CurrencyMaskModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AuthModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
