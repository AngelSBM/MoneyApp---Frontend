import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor( public http : HttpClient ) { }


  getSaldo(){

    return this.http.get(`${ base_url }/saldo`)
                .pipe(
                  map( ( resp : any ) => {
                   return resp.saldo;
                  })
                )

  }

  getGastos(){

    return this.http.get(`${ base_url }/gasto`)
                .pipe(
                  map( ( resp : any ) => {
                   return resp.gastos;
                  })
                )

  }

  getingresos(){

    return this.http.get(`${ base_url }/ingreso`)
                .pipe(
                  map( ( resp : any ) => {
                   return resp.ingresos;
                  })
                )

  }


  agregarGasto( data ){
    return this.http.post( `${ base_url }/gasto`, data ); 
  }

  agregarIngreso( data ){
    return this.http.post( `${ base_url }/ingreso`, data ); 
  }


  eliminarGasto( id ){
    return this.http.delete( `${ base_url }/gasto`, {
      headers: {
        'id': id
      }
    } );
  }

  eliminarIngreso( id ){
    return this.http.delete( `${ base_url }/ingreso`, {
      headers: {
        'id': id
      }
    } );
  }

}
