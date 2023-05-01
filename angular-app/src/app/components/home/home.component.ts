import { Component, OnInit } from '@angular/core';
import { MarketAuxService } from '../../services/market-aux.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  topNews: any[] = [];

  constructor(private marketAuxService: MarketAuxService) {}

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.marketAuxService.getTopNews());
      this.topNews = data.data;
    } catch (error) {
      console.log('Error fetching top news from MarketAux:', error);
    }
  }
}
