import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SearchForStockService } from '../navbar/search-for-stock.service';
import { Stock } from './stock';

@Component({
  selector: 'app-screener',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './screener.component.html',
  styleUrl: './screener.component.scss'
})
export class ScreenerComponent {

  stockClicked: String = '';
  selectedMarketCap: String = '';
  selectedSector: String ='';
  selectedPriceRange: String ='';
  selectedPeRatio: String ='';


  stocks: Stock[] = [
  {
    Symbol: "AAPL",
    Name: "Apple Inc.",
    Exchange: "NASDAQ",
    Sector: "Technology",
    MarketCapitalization: 3400000000000,
    PERatio: 34.5,
    DividendYield: 0.65
  },
  {
    Symbol: "MSFT",
    Name: "Microsoft Corporation",
    Exchange: "NASDAQ",
    Sector: "Technology",
    MarketCapitalization: 3100000000000,
    PERatio: 36.2,
    DividendYield: 0.72
  },
  {
    Symbol: "IBM",
    Name: "International Business Machines Corporation",
    Exchange: "NYSE",
    Sector: "Technology",
    MarketCapitalization: 180000000000,
    PERatio: 22.8,
    DividendYield: 3.45
  },
  {
    Symbol: "TSLA",
    Name: "Tesla, Inc.",
    Exchange: "NASDAQ",
    Sector: "Consumer Cyclical",
    MarketCapitalization: 1100000000000,
    PERatio: 62.7,
    DividendYield: 0
  },
  {
    Symbol: "GOOGL",
    Name: "Alphabet Inc.",
    Exchange: "NASDAQ",
    Sector: "Communication Services",
    MarketCapitalization: 2000000000000,
    PERatio: 26.4,
    DividendYield: 0.48
  },
  {
    Symbol: "AMZN",
    Name: "Amazon.com, Inc.",
    Exchange: "NASDAQ",
    Sector: "Consumer Cyclical",
    MarketCapitalization: 1900000000000,
    PERatio: 48.9,
    DividendYield: 0
  },
  {
    Symbol: "NVDA",
    Name: "NVIDIA Corporation",
    Exchange: "NASDAQ",
    Sector: "Technology",
    MarketCapitalization: 3000000000000,
    PERatio: 70.1,
    DividendYield: 0.02
  },
  {
    Symbol: "META",
    Name: "Meta Platforms, Inc.",
    Exchange: "NASDAQ",
    Sector: "Communication Services",
    MarketCapitalization: 1300000000000,
    PERatio: 27.8,
    DividendYield: 0.38
  },
  {
    Symbol: "JPM",
    Name: "JPMorgan Chase & Co.",
    Exchange: "NYSE",
    Sector: "Financial Services",
    MarketCapitalization: 600000000000,
    PERatio: 12.3,
    DividendYield: 2.15
  },
  {
    Symbol: "WMT",
    Name: "Walmart Inc.",
    Exchange: "NYSE",
    Sector: "Consumer Defensive",
    MarketCapitalization: 600000000000,
    PERatio: 31.2,
    DividendYield: 1.12
  },
  {
    Symbol: "PG",
    Name: "The Procter & Gamble Company",
    Exchange: "NYSE",
    Sector: "Consumer Defensive",
    MarketCapitalization: 400000000000,
    PERatio: 28.6,
    DividendYield: 2.35
  },
  {
    Symbol: "JNJ",
    Name: "Johnson & Johnson",
    Exchange: "NYSE",
    Sector: "Healthcare",
    MarketCapitalization: 380000000000,
    PERatio: 22.1,
    DividendYield: 3.1
  },
  {
    Symbol: "V",
    Name: "Visa Inc.",
    Exchange: "NYSE",
    Sector: "Financial Services",
    MarketCapitalization: 550000000000,
    PERatio: 30.4,
    DividendYield: 0.78
  },
  {
    Symbol: "KO",
    Name: "The Coca-Cola Company",
    Exchange: "NYSE",
    Sector: "Consumer Defensive",
    MarketCapitalization: 300000000000,
    PERatio: 25.7,
    DividendYield: 2.8
  },
  {
    Symbol: "DIS",
    Name: "The Walt Disney Company",
    Exchange: "NYSE",
    Sector: "Communication Services",
    MarketCapitalization: 200000000000,
    PERatio: 34.9,
    DividendYield: 0.95
  }
  ]

  constructor(private searchForStockService: SearchForStockService, private router: Router){}

  viewStock(value: String){

    this.searchForStockService.searchWord = value;
    this.router.navigateByUrl('/stock')
  }

 formatMarketCap(value: number): String {
    if (!value) return 'N/A';
    const absValue = Math.abs(value);
    if (absValue >= 1e12) return (value / 1e12).toFixed(2) + 'T';
    if (absValue >= 1e9) return (value / 1e9).toFixed(2) + 'B';
    if (absValue >= 1e6) return (value / 1e6).toFixed(2) + 'M';
    return value.toFixed(2);
  }

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.stocks.length / this.itemsPerPage);
  }

  get paginatedStocks(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.stocks.length);
    return this.stocks.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

}
