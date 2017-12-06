import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {KeycloakGuard} from "./guard/guard";
import {InsuranceComponent} from "./components/insurance/insurance.component";



const APP_ROUTES: Routes = [
  {path:'', component:HomeComponent},
  {path:'insurance', component:InsuranceComponent}
];


export const routing = RouterModule.forRoot(APP_ROUTES);
