import { Stock1YDataService } from './stock1-ydata.service';
import { StockData3MService } from './stock-data3-m.service';
import { StockData5DaysService } from './stock-data5-days.service';
import { StockDataIntraMonth } from './../../models/stock-data-intra-month';
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
import { StockDataIntraMonthService } from './stock-data-intra-month.service';
import { Stock5YDataService } from './stock5-ydata.service';
import Aos from 'aos';



Chart.register(...registerables);
@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './stock-page.component.html',
  styleUrl: './stock-page.component.scss'
})
export class StockPageComponent  implements OnInit, AfterViewInit{




  stockDataOverView: StockOverView | null = null;
  stockDayData: StockDayData | null = null;
  latestReport: StockFinancialStatements | null = null;
  previousReport: StockFinancialStatements | null = null;
  stockDayChartDataIntraDay: StockDayChartData[] | null = null;
  isLoadingChart = false;
  chartError: string | null = null;
  chart: Chart | null = null;
  stockIntraMonthData : StockDataIntraMonth[] = [];
  stockData5D : StockDataIntraMonth[] = [];
  stockData3M : StockDataIntraMonth[] = [];
  stockData1Y : StockDataIntraMonth[] = [];
  stockData5Y : StockDataIntraMonth[] = [];



  constructor(
    private http: HttpClient,
    private stockService: StockOverViewServiceService,
    private dayData: StockDayDataService,
    private stockFinancialStatementsService: StockFinancialStatementsService,
    private stockDayChartDataService: StockDayChartDataService,
    private searchInPut: SearchForStockService,
    private stockIntraMonthDataService: StockDataIntraMonthService,
    private stockData5DaysService : StockData5DaysService,
    private stockData3MService:StockData3MService,
    private stock1YDataService:Stock1YDataService,
    private stock5YDataService:Stock5YDataService
  ){}

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
      this.stockFinancialStatementsService.getStockIncomeStatments(this.searchInPut.searchWord).subscribe({
    next: (data) => {
      this.latestReport = data.latest;
      this.previousReport = data.previous;
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
    this.fetchIntradayData();
    this.fetchingIntraMonthData();
    this.fetching5DData();
    this.fetching3MData();
    this.fetching1YData();
    this.fetching5YData();
  }




   fetchIntradayData(): void {
    this.isLoadingChart = true;
    this.chartError = null;
    this.stockDayChartDataService.getIntradayData('IBM', '5min').subscribe({
      next: (data) => {
        this.isLoadingChart = false;
        this.stockDayChartDataIntraDay = data;
        // console.log('Intraday Data:', data); // Debug
        this.updateChartDataForDayData();
      },
      error: (err) => {
        this.isLoadingChart = false;
        this.stockDayChartDataIntraDay = null;
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching intraday data:', err);
      }
    });
  }

  fetchingIntraMonthData(): void{
    this.isLoadingChart = true;
    this.chartError = null;

    this.stockIntraMonthDataService.getIntraMonthData(this.searchInPut.searchWord).subscribe({
    next: (data) => {
        this.isLoadingChart = false;
        this.stockIntraMonthData = data;
        // console.log('Intraday Data:', data); // Debug
      },

    error: (err) => {
        this.isLoadingChart = false;
        this.stockIntraMonthData = [];
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching Intramonth data:', err);
      }
    })

  }



  fetching5DData(): void{
    this.isLoadingChart = true;
    this.chartError = null;

    this.stockData5DaysService.get5DData(this.searchInPut.searchWord).subscribe({
    next: (data) => {
        this.isLoadingChart = false;
        this.stockData5D = data;
        // console.log('Intraday Data:', data); // Debug
      },

    error: (err) => {
        this.isLoadingChart = false;
        this.stockData5D = [];
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching 5D data:', err);
      }
    })

  }




  fetching3MData(): void{
    this.isLoadingChart = true;
    this.chartError = null;

    this.stockData3MService.get3MonthData(this.searchInPut.searchWord).subscribe({
    next: (data) => {
        this.isLoadingChart = false;
        this.stockData3M = data;
      },

    error: (err) => {
        this.isLoadingChart = false;
        this.stockData3M = [];
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching 3M data:', err);
      }
    })

  }


  fetching1YData(): void{
    this.isLoadingChart = true;
    this.chartError = null;

    this.stock1YDataService.get1YData(this.searchInPut.searchWord).subscribe({
    next: (data) => {
        this.isLoadingChart = false;
        this.stockData1Y = data;
        // console.log('Intraday Data:', data); // Debug
      },

    error: (err) => {
        this.isLoadingChart = false;
        this.stockData1Y = [];
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching 1Y data:', err);
      }
    })

  }

  fetching5YData(): void{
    this.isLoadingChart = true;
    this.chartError = null;

    this.stock5YDataService.get5YData(this.searchInPut.searchWord).subscribe({
    next: (data) => {
        this.isLoadingChart = false;
        this.stockData5Y = data;
        // console.log('Intraday Data:', data); // Debug
      },

    error: (err) => {
        this.isLoadingChart = false;
        this.stockData5Y = [];
        this.chartError = err.message || 'Failed to load chart data';
        console.error('Error fetching 5Y data:', err);
      }
    })

  }


   updateChartDataForDayData(): void {
    // Update chart data with fetched intraday data
    this.config.data.labels = (this.stockDayChartDataIntraDay ?? []).map(point => point.timestamp);
    this.config.data.datasets[0].data = (this.stockDayChartDataIntraDay ?? []).map(point => point.close);
    if (this.chart) {
      this.chart.update(); // Refresh chart
    }
  }

   updateChartDataForMonthData(): void {
    // Update chart data with fetched intraday data
    this.config.data.labels = (this.stockIntraMonthData ?? []).map(point => point.timestamp);
    this.config.data.datasets[0].data = (this.stockIntraMonthData ?? []).map(point => point.close);
    if (this.chart) {
      this.chart.update(); // Refresh chart
    }
  }



     updateChartDataFor5D(): void {
      // Update chart data with fetched intraday data
      this.config.data.labels = (this.stockData5D ?? []).map(point => point.timestamp);
      this.config.data.datasets[0].data = (this.stockData5D ?? []).map(point => point.close);
      if (this.chart) {
        this.chart.update(); // Refresh chart
      }
    }

     updateChartDataFor3M(): void {
      // Update chart data with fetched intraday data
      this.config.data.labels = (this.stockData3M ?? []).map(point => point.timestamp);
      this.config.data.datasets[0].data = (this.stockData3M ?? []).map(point => point.close);
      if (this.chart) {
        this.chart.update(); // Refresh chart
      }
    }

    updateChartDataFor1Y(): void {
     // Update chart data with fetched intraday data
     this.config.data.labels = (this.stockData1Y ?? []).map(point => point.timestamp);
     this.config.data.datasets[0].data = (this.stockData1Y ?? []).map(point => point.close);
     if (this.chart) {
       this.chart.update(); // Refresh chart
     }
   }
    updateChartDataFor5Y(): void {
     // Update chart data with fetched intraday data
     this.config.data.labels = (this.stockData5Y ?? []).map(point => point.timestamp);
     this.config.data.datasets[0].data = (this.stockData5Y ?? []).map(point => point.close);
     if (this.chart) {
       this.chart.update(); // Refresh chart
     }
   }




 formatMarketCap(value: number): String {
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
    return value > 0 ? '+' + value.toFixed(4).toString() :  value.toFixed(4).toString();
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

 Aos.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
  });

 Aos.refresh()
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
