import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaldoService } from 'src/app/services/saldo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {

  saldo: number = 0;
  gastos: any[] = [];
  ingresos: any[] = [];P
  loadingIngresos : boolean = true;
  loadingGastos : boolean = true;

  constructor( private saldoService : SaldoService,
               private currencyPipe: CurrencyPipe  ) { }

  ngOnInit(): void {

    this.getSaldo();
    this.getGastos();
    this.getIngresos();

  }


  getSaldo(){
    this.saldoService.getSaldo().subscribe( resp => { 
      this.saldo = resp;
    });
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
    
    Swal.fire({
      title: '¿Seguro?',
      text: "¿Desea eliminar este gasto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({

          title: 'Opciones',
          text: "¿También desea que se le sume este gasto a su saldo actual?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, sumarle este gasto al saldo también.'

        }).then((result)=> {

          if (result.isConfirmed){

            this.saldoService.eliminarGasto( id, result.isConfirmed ).subscribe( resp => {
              this.getGastos();
              this.getSaldo();
              Swal.fire('Gasto eliminado', 'Se ha eliminado el gasto correctamente y se ha actualizado el saldo', 'success');
            });
            
          }else{

            this.saldoService.eliminarGasto( id, result.isDenied ).subscribe( resp => {
              this.getGastos();
              this.getSaldo();
              Swal.fire('Gasto eliminado', 'Se ha eliminado el gasto correctamente', 'success');
            });

          }

        });

        this.saldoService.getSaldo().subscribe( resp => this.saldo = resp );
        
      }else{

        console.log(result.isDenied);
        
      }
    })

  }

  eliminarIngreso( id : string ){

    Swal.fire({
      title: '¿Seguro?',
      text: "¿Desea eliminar este ingreso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire({

          title: 'Opciones',
          text: "¿También desea que se le reste este ingreso a su saldo actual?",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, restarle este ingreso al saldo también'

        }).then((result)=> {

          if (result.isConfirmed){
            this.saldoService.eliminarIngreso( id, result.isConfirmed ).subscribe( resp => {
              this.getIngresos();
              this.getSaldo();
              Swal.fire('Ingreso eliminado', 'Se ha eliminado el ingreso correctamente y se ha actualizado el saldo', 'success');
            });
          }else{

            this.saldoService.eliminarIngreso( id, result.isDenied ).subscribe( resp => {
              this.getIngresos();
              this.getSaldo();
              Swal.fire('Ingreso eliminado', 'Se ha eliminado el ingreso correctamente', 'success');
            });

          }

        });

        this.saldoService.getSaldo().subscribe( resp => this.saldo = resp );
        
      }else{

        console.log(result.isDenied);
        
      }
    })


    // this.saldoService.eliminarIngreso( id ).subscribe( resp => {
    //   this.getIngresos();
    // });

  }


}
