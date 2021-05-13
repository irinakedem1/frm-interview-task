import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StockApiService} from '../../../core/services/stock-api.service';
import {Observable, throwError} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {StockSearchResult} from '../../../core/model/stock-search-result';
import {StockDataService} from '../../services/stock-data.service';

@Component({
  selector: 'app-search-stocks',
  templateUrl: './search-stocks.component.html',
  styleUrls: ['./search-stocks.component.scss']
})
export class SearchStocksComponent implements OnInit {
  queryControl!: FormControl;
  searchResults$!: Observable<StockSearchResult[]>;

  constructor(private stockApi: StockApiService, private stockData: StockDataService) {
  }

  ngOnInit(): void {
    this.queryControl = new FormControl('');
    this.queryControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(val => this.searchStocks(val));
  }

  addStock(stock: StockSearchResult): void {
    this.stockData.addStock(stock.Symbol);
  }

  private searchStocks(query: string): void {
    this.searchResults$ = this.stockApi.searchStocks(query);
  }
}
