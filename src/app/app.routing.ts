import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {KeycloakGuard} from "./guard/guard";
import {InsuranceComponent} from "./components/insurance/insurance.component";
import {InsuranceComponentFailedComponent} from "./insurance-component-failed/insurance-component-failed.component"; 
import {InsuranceComponentSuccessComponent} from "./insurance-component-success/insurance-component-success.component"; 
import {InsuranceComponentErrorComponent} from "./insurance-component-error/insurance-component-error.component"; 



const APP_ROUTES: Routes = [
  {path:'', component:HomeComponent},
  {path:'insurance', component:InsuranceComponent}, 
  {path:'insurance-payment-failed/:id', component:InsuranceComponentFailedComponent},
  {path:'insurance-payment-success/:id', component:InsuranceComponentSuccessComponent}, 
  {path:'insurance-payment-error/:id', component:InsuranceComponentErrorComponent}
];


export const routing = RouterModule.forRoot(APP_ROUTES);
