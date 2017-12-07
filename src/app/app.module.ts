import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routing} from "./app.routing";

import { AppComponent } from './app.component';

// Primeng import
import {ButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';

// Component imports
import { HomeComponent } from './components/home/home.component';
import {provideAuth} from "angular2-jwt";
import {KeycloakService} from "./shared/keycloak.service";
import {KeycloakGuard} from "./guard/guard";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InsuranceComponent } from './components/insurance/insurance.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InsuranceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    ButtonModule,
    StepsModule,
    DropdownModule,
    SpinnerModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    routing
  ],
  providers: [
    provideAuth({
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true,
      tokenGetter: () => {
        return window['_keycloak'].token;
      }
    }), KeycloakService, KeycloakGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
