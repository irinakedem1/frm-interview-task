import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {StockSearchResult} from '../model/stock-search-result';
import {tap, catchError} from 'rxjs/operators';
import {Stock} from '../model/stock';

const stockUrl = 'api/stocks';

@Injectable({
  providedIn: 'root'
})
export class StockApiService {

  constructor(private httpClient: HttpClient) {
  }

  searchStocks(query: string): Observable<StockSearchResult[]> {
   return this.httpClient.get<StockSearchResult[]>(stockUrl, {params: {query}})
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleHttpError)
      );
  }

  retrieveStockData(symbols: string): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(stockUrl, {params: {symbols}})
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleHttpError)
      );
  }

  retrieveRefreshedStockData(symbols: string, updateid: number): Observable<Stock[]> {
    let params = new HttpParams();
    params = params.append('symbols', symbols);
    params = params.append('updateid', updateid.toString());

    return this.httpClient.get<Stock[]>(stockUrl, {params})
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleHttpError)
      );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<[]> {
    console.log('Http failure: ', error);
    return throwError([]);
  }
}
