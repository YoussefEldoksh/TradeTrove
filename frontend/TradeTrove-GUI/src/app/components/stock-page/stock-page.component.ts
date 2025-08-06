import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-stock-page',
  standalone: true,
  imports: [],
  templateUrl: './stock-page.component.html',
  styleUrl: './stock-page.component.scss'
})
export class StockPageComponent {

 public config: any = {
  type: 'line',
  data: {
         labels: ['Aug 01', 'Aug 02', 'Aug 03', 'Aug 04', 'Aug 05','Aug 06','Aug 07','Aug 08','Aug 09', 'Aug 10'], // Example x-axis labels (dates)
         datasets: [{
        label: 'Stock Price',
        data: [50, 102, 98, 105, 103,100,102,85,95,98], // Example y-axis data (stock prices)
        borderColor: '#475449', // Line color (red, matching your image)
        backgroundColor: '#b0a986ff', // Fill color with transparency
    tension: 0.1 // Optional: Adds curve to the line
  }
]
},

 };


 chart: any;

ngAfterViewInit() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  this.chart = new Chart(ctx, this.config);
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
