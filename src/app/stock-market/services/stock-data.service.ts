import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {Stock} from '../../core/model/stock';
import {StockApiService} from '../../core/services/stock-api.service';

@Injectable({
  providedIn: 'any'
})
export class StockDataService {
  private stocks: Stock[] = [];
  private stockDataObserver: BehaviorSubject<Stock[]> = new BehaviorSubject<Stock[]>(this.stocks);

  constructor(private stockApi: StockApiService) {
    const subscribe = interval(1000)
      .subscribe(val => {
        this.refreshStocks();
      });
  }

  getStocks(): Observable<Stock[]> {
    return this.stockDataObserver.asObservable();
  }

  addStock(symbol: string): void {
    if (!this.checkSymbolExists(symbol)) {
      this.stockApi.retrieveStockData(this.symbols(symbol))
        .subscribe(data => {
          this.updateStocks(data);
        });
    }
  }

  removeStock(stock: Stock): void {
    const ind = this.stocks.findIndex(s => s.Symbol === stock.Symbol);
    if (ind !== -1) {
      this.stocks.splice(ind, 1);
      this.updateStocks(this.stocks);
    }
  }

  private updateStocks(stocks: Stock[]): void {
    this.stocks = stocks;
    this.stockDataObserver.next(this.stocks);
  }

  private refreshStocks(): void {
    if (this.stocks.length) {
      const maxUpdatedId = Math.max(...this.stocks.map(s => s.UpdateId));
      this.stockApi.retrieveRefreshedStockData(this.symbols(), maxUpdatedId)
        .subscribe(data => console.log(data));
    }
  }

  private symbols(newSymbol?: string): string {
    return this.stocks.length ? this.stocks.map(s => s.Symbol).join() + `,${newSymbol}` : newSymbol || '';
  }

  private checkSymbolExists(symbol: string): boolean {
    if (this.stocks.find(s => s.Symbol === symbol) !== undefined) {
      alert('already subscribed');
      return true;
    } else {
      return false;
    }
  }
}
