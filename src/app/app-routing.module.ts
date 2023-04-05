import { Component, NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from "./profiles/profiles.component";
import { K401CalculatorComponent } from "./k401-calculator/k401-calculator.component";
import { RetirementincomeComponent} from "./retirementincome/retirementincome.component";
import { TaxesComponent} from "./taxes/taxes.component";
import { FeesComponent } from "./fees/fees.component";
import { CustomRouteReuseStrategy } from "./shared/custom-reuse-strategy";

const routes: Routes = [
  { path: '', redirectTo: 'account-value', pathMatch: 'full' },
  { path: 'profiles', component:  ProfilesComponent},
  { path: 'account-value', component: K401CalculatorComponent},
  { path: 'retirement-income', component: RetirementincomeComponent},
  { path: 'taxes', component: TaxesComponent },
  { path: 'fees', component: FeesComponent },
  { path: '**', redirectTo: 'account-value' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: CustomRouteReuseStrategy,
  }],
})
export class AppRoutingModule { }
