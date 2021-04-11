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

  constructor( private saldoService : SaldoService  ) { }

  ngOnInit(): void {

    this.saldoService.getSaldo().subscribe( resp => this.saldo = resp );
    this.saldoService.getGastos().subscribe( resp => this.gastos = resp );
    this.saldoService.getingresos().subscribe( resp => this.ingresos = resp );

  }

  eliminarGasto( id: string ){
    
    this.saldoService.eliminarGasto( id ).subscribe( resp => {
      console.log(resp);

      this.saldoService.getGastos().subscribe( resp => this.gastos = resp );
      
    });
  }

  eliminarIngreso( id : string){

    this.saldoService.eliminarIngreso( id ).subscribe( resp => {
      console.log(resp);
      
      this.saldoService.getingresos().subscribe( resp => this.ingresos = resp );
      
    });

  }


}
