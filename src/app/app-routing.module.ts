import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastosComponent } from './acciones/gastos/gastos.component';
import { IngresosComponent } from './acciones/ingresos/ingresos.component';
import { SaldoComponent } from './acciones/saldo/saldo.component';

const routes: Routes = [
  { path: '', component: SaldoComponent },
  { path: 'gastos', component: GastosComponent },
  { path: 'ingresos', component: IngresosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
