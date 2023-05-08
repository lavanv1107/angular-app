import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoinApiService {
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

  // Get exchange rate between pair of requested assets at current time
  getExchangeRate(symbol1: string, symbol2: string): Observable<any> {
    const url = `${this.apiUrl}/exchangerate/${symbol1}/${symbol2}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, headers);
  }

  // Get detailed list of assets
  getAssets(): Observable<any> {
    const url = `${this.apiUrl}/assets`;
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
    const url = `${this.apiUrl}/exchangerate/${cryptoSymbol}/${currencySymbol}/history?period_id=1DAY&time_start=${startDate}&time_end=${endDate}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, headers);
  }
}
