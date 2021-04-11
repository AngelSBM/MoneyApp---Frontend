import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {

  saldo: number = 0;
  gastos: any[] = [];
  ingresos: any[] = [];
  loadingIngresos : boolean = true;
  loadingGastos : boolean = true;

  constructor( private saldoService : SaldoService  ) { }

  ngOnInit(): void {

    this.saldoService.getSaldo().subscribe( resp => this.saldo = resp );
    this.getGastos();
    this.getIngresos();

  }


  getGastos(){
    this.loadingGastos = true;

    this.saldoService.getGastos().subscribe( resp => {
      this.gastos = resp;
      this.loadingGastos = false;
    } );
  }


  getIngresos(){
    this.loadingIngresos = true;

    this.saldoService.getingresos().subscribe( resp => {
      this.ingresos = resp;
      this.loadingIngresos = false;
    } );
  }


  eliminarGasto( id: string ){
    
    this.saldoService.eliminarGasto( id ).subscribe( resp => {
      this.getGastos();
    });
  }

  eliminarIngreso( id : string){

    this.saldoService.eliminarIngreso( id ).subscribe( resp => {
      this.getIngresos();
    });

  }


}
