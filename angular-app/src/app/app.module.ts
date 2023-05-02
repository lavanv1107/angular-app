import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CurrencyListComponent } from './components/currency-list/currency-list.component';
import { CurrencyDetailsComponent } from './components/currency-details/currency-details.component';
import { ChartComponent } from './components/chart/chart.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    CurrencyListComponent,
    CurrencyDetailsComponent,
    ChartComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FontAwesomeModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
