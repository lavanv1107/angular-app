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
  assets: any[] = [];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'Currency', field: 'asset_id' },
    { headerName: 'Name', field: 'name' },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private coinApiService: CoinApiService) {
  }

  async ngOnInit() {
    try {
      const assetsData = await firstValueFrom(this.coinApiService.getAssets());
      this.assets = assetsData;

      this.rowData = assetsData.filter((obj: any) => obj.type_is_crypto === 1);
      this.agGrid.api.sizeColumnsToFit();
    } catch (error) {
      console.log('Error fetching assets from CoinAPI:', error);
    }
  }
}
