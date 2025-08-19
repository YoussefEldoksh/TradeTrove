import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoToStockFromScreenerService {
  stockClicked: String = "IBM"
  constructor() { }
}
