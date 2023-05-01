import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private apiUrl = 'https://rest.coinapi.io/v1'; // The API base URL
  private apiKey = environment.coinAPIKey; // Your CoinAPI.io API key

  constructor(private http: HttpClient) {}

  // Get headers for API requests
  private getHeaders() {
    const headers = new HttpHeaders({
      'X-CoinAPI-Key': this.apiKey,
    });
    return { headers };
  }

  // Get cryptocurrency exchange rates
  getExchangeRates(
    cryptoSymbol: string,
    currencySymbol: string
  ): Observable<any> {
    const url = `${this.apiUrl}/exchangerate/${cryptoSymbol}/${currencySymbol}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, headers);
  }

  // Get historical cryptocurrency data
  getHistoricalData(
    cryptoSymbol: string,
    currencySymbol: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const url = `${this.apiUrl}/ohlcv/${cryptoSymbol}/${currencySymbol}/history?period_id=1DAY&time_start=${startDate}&time_end=${endDate}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, headers);
  }
}
