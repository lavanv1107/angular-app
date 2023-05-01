import { Component, OnInit } from '@angular/core';
import { MarketAuxService } from '../../services/market-aux.service';
import { firstValueFrom } from 'rxjs';

import { faReadme } from '@fortawesome/free-brands-svg-icons';
import { faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  news: any[] = [];

  constructor(private marketAuxService: MarketAuxService) {}

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.marketAuxService.getNews());
      this.news = data.data;
    } catch (error) {
      console.log('Error fetching top news from MarketAux:', error);
    }
  }

  faReadme = faReadme;
  faBookmark = faBookmark;
  faShare = faShare;
}
