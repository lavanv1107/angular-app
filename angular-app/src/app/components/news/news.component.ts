import { Component, OnInit } from '@angular/core';

import { MarketAuxService } from '../../services/market-aux.service';
import { firstValueFrom } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '2s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class NewsComponent implements OnInit {
  news: any[] = [];

  constructor(
    private marketAuxService: MarketAuxService,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.marketAuxService.getNews());
      this.news = data.data;
    } catch (error) {
      console.log('Error fetching top news from MarketAux:', error);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
