import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {StockOverView} from '../../models/stock-over-view';


@Injectable({
  providedIn: 'root'
})
export class StockOverViewServiceService {
  private apiUrl = 'https://www.alphavantage.co/query';
  private apiKey = 'ZLYYLQ9CA4SATO6J';

  constructor(private http: HttpClient) {}

  getStockOverview(symbol: string): Observable<StockOverView> {
    // const url = `${this.apiUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`;
    const url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";
    return this.http.get<StockOverView>(url).pipe(
      map(data => this.mapToStockOverview(data)),
      catchError(this.handleError)
    );
  }

  private mapToStockOverview(data: any): StockOverView {
    return {
  Symbol: data.symbol || data.Symbol || '',
  AssetType: data.AssetType || '',
  Name: data.Name || '',
  Description: data.Description || '',
  CIK: data.CIK || '',
  Exchange: data.Exchange || '',
  Currency: data.Currency || '',
  Country: data.Country || '',
  Sector: data.Sector || '',
  Industry: data.Industry || '',
  Address: data.Address || '',
  OfficialSite: data.OfficialSite || '',
  FiscalYearEnd: data.FiscalYearEnd || '',
  LatestQuarter: data.LatestQuarter || '',
  MarketCapitalization: parseFloat(data.MarketCapitalization) || 0,
  EBITDA: parseFloat(data.EBITDA) || 0,
  PERatio: parseFloat(data.PERatio) || 0,
  PEGRatio: parseFloat(data.PEGRatio) || 0,
  BookValue: parseFloat(data.BookValue) || 0,
  DividendPerShare: parseFloat(data.DividendPerShare) || 0,
  DividendYield: parseFloat(data.DividendYield) || 0,
  EPS: parseFloat(data.EPS) || 0,
  RevenuePerShareTTM: parseFloat(data.RevenuePerShareTTM) || 0,
  ProfitMargin: parseFloat(data.ProfitMargin) || 0,
  OperatingMarginTTM: parseFloat(data.OperatingMarginTTM) || 0,
  ReturnOnAssetsTTM: parseFloat(data.ReturnOnAssetsTTM) || 0,
  ReturnOnEquityTTM: parseFloat(data.ReturnOnEquityTTM) || 0,
  RevenueTTM: parseFloat(data.RevenueTTM) || 0,
  GrossProfitTTM: parseFloat(data.GrossProfitTTM) || 0,
  DilutedEPSTTM: parseFloat(data.DilutedEPSTTM) || 0,
  QuarterlyEarningsGrowthYOY: parseFloat(data.QuarterlyEarningsGrowthYOY) || 0,
  QuarterlyRevenueGrowthYOY: parseFloat(data.QuarterlyRevenueGrowthYOY) || 0,
  AnalystTargetPrice: parseFloat(data.AnalystTargetPrice) || 0,
  AnalystRatingStrongBuy: parseInt(data.AnalystRatingStrongBuy, 10) || 0,
  AnalystRatingBuy: parseInt(data.AnalystRatingBuy, 10) || 0,
  AnalystRatingHold: parseInt(data.AnalystRatingHold, 10) || 0,
  AnalystRatingSell: parseInt(data.AnalystRatingSell, 10) || 0,
  AnalystRatingStrongSell: parseInt(data.AnalystRatingStrongSell, 10) || 0,
  TrailingPE: parseFloat(data.TrailingPE) || 0,
  ForwardPE: parseFloat(data.ForwardPE) || 0,
  PriceToSalesRatioTTM: parseFloat(data.PriceToSalesRatioTTM) || 0,
  PriceToBookRatio: parseFloat(data.PriceToBookRatio) || 0,
  EVToRevenue: parseFloat(data.EVToRevenue) || 0,
  EVToEBITDA: parseFloat(data.EVToEBITDA) || 0,
  Beta: parseFloat(data.Beta) || 0,
  '52WeekHigh': parseFloat(data['52WeekHigh']) || 0,
  '52WeekLow': parseFloat(data['52WeekLow']) || 0,
  '50DayMovingAverage': parseFloat(data['50DayMovingAverage']) || 0,
  '200DayMovingAverage': parseFloat(data['200DayMovingAverage']) || 0,
  SharesOutstanding: parseFloat(data.SharesOutstanding) || 0,
  SharesFloat: parseFloat(data.SharesFloat) || 0,
  PercentInsiders: parseFloat(data.PercentInsiders) || 0,
  PercentInstitutions: parseFloat(data.PercentInstitutions) || 0,
  DividendDate: data.DividendDate || '',
  ExDividendDate: data.ExDividendDate || ''
};
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Failed to fetch stock data; please try again later.'));
  }
}
