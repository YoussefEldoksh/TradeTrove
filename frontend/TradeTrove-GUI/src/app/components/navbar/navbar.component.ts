import { SearchForStockService } from './search-for-stock.service';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Aos from 'aos';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,MatInputModule,MatIconModule,MatFormFieldModule,ButtonModule, FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements  AfterViewInit {

  searchStockWord: string = '';

  constructor(private searchForStockService: SearchForStockService, private router: Router){}


  ngAfterViewInit(): void {
    Aos.init();
    Aos.refresh();
  }

  changeSearchValue(value: HTMLElement)
  {
      this.searchForStockService.searchWord = this.searchStockWord;
      this.router.navigateByUrl('/stock')

  }
}
