import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-screener',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './screener.component.html',
  styleUrl: './screener.component.scss'
})
export class ScreenerComponent {
dataSource: any;

}
