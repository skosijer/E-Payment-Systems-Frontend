import { BrowserModule } from '@angular/platform-browser';
import {NgModule, APP_INITIALIZER} from '@angular/core';
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
import {DialogModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';

// Component imports
import { HomeComponent } from './components/home/home.component';
import {provideAuth} from "angular2-jwt";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import {InsuranceDataService} from "./components/insurance/insurance-data.service";

import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { PaypalComponent } from './paypal/paypal.component';
import {initializer} from "./utils/app-init";
import {KeycloakService, KeycloakAngularModule} from "keycloak-angular";
import {AppAuthGuard} from "./keycloak.guard";
import { InsuranceComponentFailedComponent } from './insurance-component-failed/insurance-component-failed.component';
import { InsuranceComponentSuccessComponent } from './insurance-component-success/insurance-component-success.component';
import { InsuranceComponentErrorComponent } from './insurance-component-error/insurance-component-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InsuranceComponent,
    FieldErrorDisplayComponent,
    PaypalComponent,
    InsuranceComponentFailedComponent,
    InsuranceComponentSuccessComponent,
    InsuranceComponentErrorComponent
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
    routing,
    DialogModule,
    CheckboxModule,
    RadioButtonModule,
    GrowlModule,
    KeycloakAngularModule
  ],
  providers: [
    provideAuth({
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true,
      tokenGetter: () => {
        return window['_keycloak'].token;
      }
    }), InsuranceDataService, AppAuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
