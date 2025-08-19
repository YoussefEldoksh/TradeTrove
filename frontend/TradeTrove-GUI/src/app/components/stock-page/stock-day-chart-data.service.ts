import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StockDayChartData } from '../../models/stock-day-chart-data';



@Injectable({
  providedIn: 'root'
})
export class StockDayChartDataService {


constructor(private http: HttpClient) {}

 private apiUrl = 'https://www.alphavantage.co/query';
 private apiKey = 'G6W9HA8AKRP3TUC5';


  getIntradayData(symbol: String, interval: string = '5min'): Observable<StockDayChartData[]> {
    // const url = `${this.apiUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}`;
  const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo";
    return this.http.get<StockDayChartData>(url).pipe(
      map((data) => {
        console.log('Raw API Response for symbol', symbol, ':', data);
        return this.mapToIntradayData(data);
      }),
      catchError(this.handleError)
    );
  }


  private mapToIntradayData(data: any): StockDayChartData[] {
    // Check for API errors
    if (data['Error Message']) {
      console.warn('API Error:', data['Error Message']);
      return [];
    }
    if (data['Information']) {
      console.warn('API Info:', data['Information']); // E.g., rate limit
      return [];
    }

    const timeSeriesKey = `Time Series (${this.getIntervalKey(data['Meta Data']?.['4. Interval'])})`;
    const timeSeries = data[timeSeriesKey] || {};

    if (!Object.keys(timeSeries).length) {
      console.warn('No intraday data found in response:', data);
      return [];
    }

    // Transform time series into array
    return Object.entries(timeSeries)
      .map(([timestamp, values]: [string, any]) => ({
        timestamp,
        open: parseFloat(values['1. open']) || 0,
        high: parseFloat(values['2. high']) || 0,
        low: parseFloat(values['3. low']) || 0,
        close: parseFloat(values['4. close']) || 0,
        volume: parseInt(values['5. volume'], 10) || 0
      }))
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // Sort ascending by timestamp
  }


  private getIntervalKey(interval: string): string {
    // Handle different interval formats if needed
    return interval || '5min';
  }

   private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error Code: ${error.status}, Message: ${error.message}`;
      if (error.status === 429) {
        errorMessage = 'API rate limit exceeded. Please try again later.';
      } else if (error.status === 0) {
        errorMessage = 'Network error: Unable to reach the API. Check your internet connection or CORS settings.';
      }
    }
    console.error('API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
