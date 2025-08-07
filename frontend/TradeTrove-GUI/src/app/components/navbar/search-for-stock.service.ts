import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchForStockService {
  searchWord: string = 'IBM';
  constructor() {}

}
