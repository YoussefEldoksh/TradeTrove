import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { StockDataIntraMonth } from '../../models/stock-data-intra-month';

@Injectable({
  providedIn: 'root'
})
export class StockData5DaysService {

 constructor(private http: HttpClient) {}

  private apiUrl = 'https://www.alphavantage.co/query';
  private apiKey = 'G6W9HA8AKRP3TUC5';



    get5DData(symbol: String): Observable<StockDataIntraMonth[]> {
      // const url = `${this.apiUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo";
      return this.http.get<StockDataIntraMonth>(url).pipe(
        map((data) => {
          console.log('Raw API Response for symbol', symbol, ':', data);
          return this.mapToIntraMonthData(data);
        }),
        catchError(this.handleError)
      );
    }

  private mapToIntraMonthData(data: any): StockDataIntraMonth[] {
    // Check for API errors
    if (data['Error Message']) {
      console.warn('API Error:', data['Error Message']);
      return [];
    }
    if (data['Information']) {
      console.warn('API Info:', data['Information']); // E.g., rate limit
      return [];
    }

    const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));
    if (!timeSeriesKey || !data[timeSeriesKey]) {
      console.warn('No time series data found in response');
      return [];
    }

    // Map the time series data to StockDataIntraMonth array
    return Object.keys(data[timeSeriesKey]).map(date => ({
      timestamp: date,
      open: parseFloat(data[timeSeriesKey][date]['1. open']),
      high: parseFloat(data[timeSeriesKey][date]['2. high']),
      low: parseFloat(data[timeSeriesKey][date]['3. low']),
      close: parseFloat(data[timeSeriesKey][date]['4. close']),
      volume: parseInt(data[timeSeriesKey][date]['6. volume'], 10),
    })).slice(0,1225).reverse();
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw new Error('Failed to fetch stock data');
  }


}
