import { Component, OnInit } from '@angular/core';
import {StockDataService} from '../../services/stock-data.service';
import {Observable} from 'rxjs';
import {Stock} from '../../../core/model/stock';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.scss']
})
export class StockDetailsComponent implements OnInit {
  stocks$!: Observable<Stock[]>;

  constructor(private stockData: StockDataService) { }

  ngOnInit(): void {
    this.stocks$ = this.stockData.getStocks();
  }

  removeStock(stock: Stock): void {
    this.stockData.removeStock(stock);
  }
}
