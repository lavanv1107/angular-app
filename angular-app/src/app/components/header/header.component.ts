import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  exchangeRate = 0;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    // Call the getExchangeRates() method from our service
    this.cryptoService.getExchangeRates('BTC', 'USD').subscribe((data) => {
      this.exchangeRate = data.rate;
    });
  }
}
