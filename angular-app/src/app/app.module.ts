import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CurrencyIndexComponent } from './components/currency-index/currency-index.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { ChartComponent } from './components/chart/chart.component';

import { SentenceLimitPipe } from './pipes/sentence-limit.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapSearch,
  bootstrapGithub,
  bootstrapNewspaper,
  bootstrapCurrencyExchange,
  bootstrapGraphUp,
} from '@ng-icons/bootstrap-icons';

import { AgGridModule } from 'ag-grid-angular';
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CurrencyIndexComponent,
    ChartComponent,
    NewsComponent,
    NavComponent,
    SentenceLimitPipe,
    ExchangeRateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgIconsModule.withIcons({
      bootstrapSearch,
      bootstrapGithub,
      bootstrapNewspaper,
      bootstrapCurrencyExchange,
      bootstrapGraphUp,
    }),
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
