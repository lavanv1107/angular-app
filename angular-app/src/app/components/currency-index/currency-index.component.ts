import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

import { CoinApiService } from '../../services/coin-api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-currency-index',
  templateUrl: './currency-index.component.html',
  styleUrls: ['./currency-index.component.css'],
})
export class CurrencyIndexComponent implements OnInit {
  exchangeRates: any[] = [];
  assets: any[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'Currency', field: 'asset_id_quote' },
    { headerName: 'Name', field: 'name' },
    {
      headerName: 'Rate',
      field: 'price_usd',
      valueFormatter: (params) => params.value + ' USD',
    },
    {
      headerName: 'Date',
      field: 'time',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
      },
    },
    {
      headerName: 'Time',
      field: 'time',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const options: Intl.DateTimeFormatOptions = {
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
        };
        return date.toLocaleTimeString('en-US', options);
      },
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private coinApiService: CoinApiService) {}

  async ngOnInit() {
    try {
      const exchangeRatesData = await firstValueFrom(
        this.coinApiService.getExchangeRates('USD')
      );
      this.exchangeRates = exchangeRatesData.rates;

      const assetsData = await firstValueFrom(this.coinApiService.getAssets());
      this.assets = assetsData;

      const mergedData = this.exchangeRates.map((exchangeRate: any) => {
        const asset = this.assets.find(
          (a: any) => a.asset_id === exchangeRate.asset_id_quote
        );
        return { ...exchangeRate, ...asset };
      });

      this.rowData = mergedData.filter((obj) => obj.type_is_crypto === 1);
      this.agGrid.api.sizeColumnsToFit();
    } catch (error) {
      console.log('Error fetching top news from CoinAPI:', error);
    }
  }
}
