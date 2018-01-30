import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {InsuranceComponent} from "./components/insurance/insurance.component";
import {AppAuthGuard} from "./keycloak.guard";



const APP_ROUTES: Routes = [
  {path:'', component:HomeComponent},
  {path:'insurance', component:InsuranceComponent, canActivate: [AppAuthGuard]}
];


export const routing = RouterModule.forRoot(APP_ROUTES);
