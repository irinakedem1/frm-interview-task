import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockMarketRoutingModule } from './stock-market-routing.module';
import { StockMarketComponent } from './stock-market.component';
import { SearchStocksComponent } from './components/search-stocks/search-stocks.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';


@NgModule({
  declarations: [
    StockMarketComponent,
    SearchStocksComponent,
    StockDetailsComponent
  ],
  imports: [
    CommonModule,
    StockMarketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StockMarketModule { }
