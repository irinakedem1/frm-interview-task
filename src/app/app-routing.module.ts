import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found.component';
import {StockMarketModule} from './stock-market/stock-market.module';

const routes: Routes = [
  {path: '', redirectTo: 'stock-market', pathMatch: 'full'},
  {path: 'stock-market', loadChildren: () => import('./stock-market/stock-market.module').then(m => m.StockMarketModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), StockMarketModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
