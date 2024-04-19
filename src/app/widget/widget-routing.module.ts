import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { DataWidgetComponent } from './data-widget/data-widget.component';
import { StatisticheFidasComponent } from './statistiche-fidas/statistiche-fidas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart-widget',
    pathMatch: 'full'
  },
  {
    path: 'chart-widget',
    component: ChartWidgetComponent
  },
  {
    path: 'data-widget',
    component: DataWidgetComponent
  },
  {
    path: 'statistiche-fidas',
    component: StatisticheFidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule {}
