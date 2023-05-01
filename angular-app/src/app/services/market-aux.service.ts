import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarketAuxService {
  private apiKey = environment.marketAPIKey;
  private apiUrl = 'https://api.marketaux.com/v1';

  constructor(private http: HttpClient) {}

  getTopNews(): Observable<any> {
    const url = `${this.apiUrl}/news/top?apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
