import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesComponent } from './pages/pages.component';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    PagesModule,  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES"},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
