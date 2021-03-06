import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GastosComponent } from './acciones/gastos/gastos.component';
import { IngresosComponent } from './acciones/ingresos/ingresos.component';
import { SaldoComponent } from './acciones/saldo/saldo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    GastosComponent,
    IngresosComponent,
    SaldoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ CurrencyPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
