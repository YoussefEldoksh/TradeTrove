import { StockDayChartDataService } from './stock-day-chart-data.service';
import { StockDayChartData } from './../../models/stock-day-chart-data';
import { StockFinancialStatements } from './../../models/stock-financial-statements';
import { StockFinancialStatementsService } from './stock-financial-statements.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import {StockOverView} from '../../models/stock-over-view';
import { Observable } from 'rxjs';
import { StockOverViewServiceService } from './stock-over-view-service.service';
import { StockDayDataService } from './stock-day-data.service';
import { StockDayData } from '../../models/stock-day-data';
import { SearchForStockService } from '../navbar/search-for-stock.service';



Chart.register(...registerables);
@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './stock-page.component.html',
  styleUrl: './stock-page.component.scss'
})
export class StockPageComponent  implements OnInit, AfterViewInit{

  private apiUrl = 'https://www.alphavantage.co/query';
  private apiKey = 'O4T94T6QQ5T9Y0F0';



  stockDataOverView: StockOverView | null = null;
  stockDayData: StockDayData | null = null;
  latestReport: StockFinancialStatements | null = null;
  previousReport: StockFinancialStatements | null = null;
  stockDayChartDataIntraDay: StockDayChartData[] | null = null;
  isLoadingChart = false;
  chartError: string | null = null;
  chart: Chart | null = null;



  constructor(private http: HttpClient, private stockService: StockOverViewServiceService, private dayData: StockDayDataService, private stockFinancialStatementsService: StockFinancialStatementsService, private stockDayChartDataService: StockDayChartDataService, private searchInPut: SearchForStockService){}

  ngOnInit(): void {

      this.stockService.getStockOverview(this.searchInPut.searchWord).subscribe({
        next: (data)=>{
          this.stockDataOverView  = data;
          console.log(this.searchInPut.searchWord);

        }
      })


      this.dayData.getStockDayData(this.searchInPut.searchWord).subscribe({
        next: (data2)=>{
          this.stockDayData = data2;
        }
      })
      this.stockFinancialStatementsService.getStockDayData(this.searchInPut.searchWord).subscribe({
    next: (data) => {
      this.latestReport = data.latest;
      this.previousReport = data.previous;
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
this.fetchIntradayData();
  }




  private fetchIntradayData(): void {
    this.isLoadingChart = true;
    this.chartError = null;
    this.stockDayChartDataService.getIntradayData('IBM', '5min').subscribe({
      next: (data) => {
        this.isLoadingChart = false;
        this.stockDayChartDataIntraDay = data;
        // console.log('Intraday Data:', data); // Debug
        this.updateChartData();
      },
      error: (err) => {
        this.isLoadingChart = false;
        this.stockDayChartDataIntraDay = null;
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching intraday data:', err);
      }
    });
  }


  private updateChartData(): void {
    // Update chart data with fetched intraday data
    this.config.data.labels = (this.stockDayChartDataIntraDay ?? []).map(point => point.timestamp);
    this.config.data.datasets[0].data = (this.stockDayChartDataIntraDay ?? []).map(point => point.close);
    if (this.chart) {
      this.chart.update(); // Refresh chart
    }
  }





 formatMarketCap(value: number): string {
    if (!value) return 'N/A';
    const absValue = Math.abs(value);
    if (absValue >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (absValue >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (absValue >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    return value.toFixed(2);
  }

 changeSign() : string {
    if (!this.stockDayData) {
      return 'N/A';
    }
    const value: number = this.stockDayData.price - this.stockDayData.previousClose;
    return value > 0 ? '+' + value.toFixed(4).toString() : '-' + value.toFixed(4).toString();
 }
 changePercentage(value1:number, value2: number) : string | null {

  if (value2 === 0 || isNaN(value1) || isNaN(value2) || value1 === null || value2 === null) {
      return null;
    }
      // Avoid extremely small denominators to prevent huge results
  if (Math.abs(value2) < 1e-10) {
    return null;
  }

  // Calculate percentage change: ((new - old) / old) * 100
  const value: number = ((value1 - value2) / value2) * 100;

  // Cap extremely large values to prevent unrealistic results
  if (Math.abs(value) > 1e6) {
    return null;
  }
  return value > 0 ? '+' + value.toFixed(3).toString() : value.toFixed(3).toString();
 }



  public config: any = {
    type: 'line',
    data: {
      labels: [], // Initialize as empty
      datasets: [{
        label: 'Stock Price (Close)',
        data: [], // Initialize as empty
        borderColor: '#475449',
        backgroundColor: '#b0a986ff',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'Price (USD)' } }
      }
    }
  };



ngAfterViewInit() {
 const ctx = document.getElementById('myChart') as HTMLCanvasElement;
 if (ctx) {
   this.chart = new Chart(ctx, this.config);
 } else {
   console.error('Canvas element with ID "myChart" not found');
 }
}








  displayOverView(overviewTap:HTMLElement, financials:HTMLElement, overviewTap2:HTMLElement){

      overviewTap.classList.remove('d-none');
      overviewTap2.classList.remove('d-none');
      financials.classList.add('d-none');
}

displayFinancials(overviewTap:HTMLElement, financials:HTMLElement,overviewTap2:HTMLElement)
{
      overviewTap.classList.add('d-none');
      overviewTap2.classList.add('d-none');
      financials.classList.remove('d-none');
}
}
