import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaldoService } from 'src/app/services/saldo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {


  public inputsGastos : FormGroup;
  public valid : boolean = true;
  public mostrar: boolean = false;

  constructor( private fb: FormBuilder,
               private saldoService: SaldoService,
               private location: Location ) { }

  ngOnInit(): void {

    this.inputsGastos = this.fb.group({
      gasto: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

  }

  agregarGasto(){

    console.log(this.inputsGastos.value);
    
    if ( !this.inputsGastos.value.gasto ){
     return Swal.fire('ERROR', 'Para registrar un gasto, debe especificar que tipo de gasto es y su cantidad', 'error');
    }else {
      this.valid = true;
    };
   
    const { gasto, cantidad } = this.inputsGastos.value;

    const registroGasto = {
      gasto,
      cantidad 
    }

    this.saldoService.agregarGasto( registroGasto ).subscribe( resp => {

      Swal.fire('Gasto añadido', `Se ha añadido el gasto correctamente`, 'success' );

      setTimeout(() => {
        this.back();
      }, 2000);

    });

  }



  crearCategoria(e){

    e.preventDefault();

    // Selector del texto del input añadirCategoria
    const categoriaInput = (<HTMLInputElement>document.getElementById('nuevaCategoria')).value;    


    if( categoriaInput === '' ){
      return Swal.fire('ERROR', 'No puede añadir una categoría sin nombre', 'error');
    }

    //Crear etiqueta option con contenga la categoria escrita
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = categoriaInput;
    nuevaOpcion.innerHTML = categoriaInput;


    const categories = (<HTMLInputElement>document.getElementById('categories'));
    const position = categories.children.length;
    categories[position] = nuevaOpcion; 

    this.inputsGastos.value.gasto = categoriaInput;
    categories.value = categoriaInput;
    
    
    this.mostrar = true;

  }

  back(){
    this.location.back();
  }

}
