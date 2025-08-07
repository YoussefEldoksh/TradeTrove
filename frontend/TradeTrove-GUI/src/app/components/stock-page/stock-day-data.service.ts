import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StockDayData } from '../../models/stock-day-data';

@Injectable({
  providedIn: 'root'
})
export class StockDayDataService {

 private apiUrl = 'https://www.alphavantage.co/query';
 private apiKey = 'ZLYYLQ9CA4SATO6J';

 constructor(private http: HttpClient) {}

  getStockDayData(symbol: string): Observable<StockDayData> {
    // const url = `${this.apiUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`;
    const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";

    return this.http.get<any>(url).pipe(
      map((data) => this.mapToStockOverview(data)),
      catchError(this.handleError)
    );
  }


    private mapToStockOverview(data: any): StockDayData {
    const globalQuote = data['Global Quote'];
    if (!globalQuote) {
      throw new Error('No Global Quote data available');
    }
    return {
      symbol: globalQuote['01. symbol'] || '',
      open: parseFloat(globalQuote['02. open']) || 0,
      high: parseFloat(globalQuote['03. high']) || 0,
      low: parseFloat(globalQuote['04. low']) || 0,
      price: parseFloat(globalQuote['05. price']) || 0,
      volume: parseInt(globalQuote['06. volume'], 10) || 0,
      latestTradingDay: globalQuote['07. latest trading day'] || '',
      previousClose: parseFloat(globalQuote['08. previous close']) || 0,
      change: parseFloat(globalQuote['09. change']) || 0,
      changePercent: globalQuote['10. change percent'] || ''
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Failed to fetch stock data; please try again later.'));
  }
}
