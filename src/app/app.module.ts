import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Primeng import
import {ButtonModule} from 'primeng/primeng';
import { HomeComponent } from './components/home/home.component';
import {provideAuth} from "angular2-jwt";
import {routing} from "./app.routing";
import {KeycloakService} from "./shared/keycloak.service";
import {KeycloakGuard} from "./guard/guard";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
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
