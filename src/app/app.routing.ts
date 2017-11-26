import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {KeycloakGuard} from "./guard/guard";



const APP_ROUTES: Routes = [
  {path:'', component:HomeComponent}
]


export const routing = RouterModule.forRoot(APP_ROUTES);
