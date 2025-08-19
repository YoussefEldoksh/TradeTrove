import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StockFinancialStatements } from '../../models/stock-financial-statements';
@Injectable({
  providedIn: 'root'
})
export class StockFinancialStatementsService {

private apiUrl = 'https://www.alphavantage.co/query';
 private apiKey = 'G6W9HA8AKRP3TUC5';

 constructor(private http: HttpClient) {}

getStockIncomeStatments(symbol: String): Observable<{ latest: StockFinancialStatements; previous: StockFinancialStatements | null }> {
  // const url = `${this.apiUrl}?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${this.apiKey}`;
  const url = "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo";

  return this.http.get<any>(url).pipe(
    map((data) => this.mapToStockOverview(data)),
    catchError(this.handleError)
  );
}

private mapToStockOverview(data: any): { latest: StockFinancialStatements; previous: StockFinancialStatements | null } {
  const reports = data.annualReports || [];
  if (!reports.length) {
    throw new Error('No annual report data available');
  }

  const mapReport = (report: any): StockFinancialStatements => ({
    fiscalDateEnding: report.fiscalDateEnding || '',
    reportedCurrency: report.reportedCurrency || 'USD',
    grossProfit: parseFloat(report.grossProfit) || 0,
    totalRevenue: parseFloat(report.totalRevenue) || 0,
    costOfRevenue: parseFloat(report.costOfRevenue) || 0,
    costofGoodsAndServicesSold: parseFloat(report.costofGoodsAndServicesSold) || 0,
    operatingIncome: parseFloat(report.operatingIncome) || 0,
    sellingGeneralAndAdministrative: parseFloat(report.sellingGeneralAndAdministrative) || 0,
    researchAndDevelopment: parseFloat(report.researchAndDevelopment) || 0,
    operatingExpenses: parseFloat(report.operatingExpenses) || 0,
    investmentIncomeNet: report.investmentIncomeNet === 'None' ? null : report.investmentIncomeNet,
    netInterestIncome: parseFloat(report.netInterestIncome) || 0,
    interestIncome: parseFloat(report.interestIncome) || 0,
    interestExpense: parseFloat(report.interestExpense) || 0,
    nonInterestIncome: report.nonInterestIncome === 'None' ? null : report.nonInterestIncome,
    otherNonOperatingIncome: report.otherNonOperatingIncome === 'None' ? null : report.otherNonOperatingIncome,
    depreciation: report.depreciation === 'None' ? null : report.depreciation,
    depreciationAndAmortization: parseFloat(report.depreciationAndAmortization) || 0,
    incomeBeforeTax: parseFloat(report.incomeBeforeTax) || 0,
    incomeTaxExpense: parseFloat(report.incomeTaxExpense) || 0,
    interestAndDebtExpense: report.interestAndDebtExpense === 'None' ? null : report.interestAndDebtExpense,
    netIncomeFromContinuingOperations: parseFloat(report.netIncomeFromContinuingOperations) || 0,
    comprehensiveIncomeNetOfTax: report.comprehensiveIncomeNetOfTax === 'None' ? null : report.comprehensiveIncomeNetOfTax,
    ebit: parseFloat(report.ebit) || 0,
    ebitda: parseFloat(report.ebitda) || 0,
    netIncome: parseFloat(report.netIncome) || 0
  });

  return {
    latest: mapReport(reports[0]),
    previous: reports[1] ? mapReport(reports[1]) : null
  };
}
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 429) {
        errorMessage = 'API rate limit exceeded. Please try again later.';
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
