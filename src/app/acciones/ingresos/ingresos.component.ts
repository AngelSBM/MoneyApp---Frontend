import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaldoService } from 'src/app/services/saldo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  public inputsIngresos : FormGroup;
  public valid : boolean = true;
  public mostrar: boolean = false;

  constructor( private fb: FormBuilder,
               private saldoService: SaldoService,
               private location : Location ) { }

  ngOnInit(): void {

    this.inputsIngresos = this.fb.group({
      ingreso: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

  }

  agregarIngreso(){
    if ( !this.inputsIngresos.valid ){
     return Swal.fire('Error', 'Para añadir un gasto, debe definir un ingreso y de donde proviene', 'error')
    }else {
      this.valid = true;
    };
   
    const { ingreso, cantidad } = this.inputsIngresos.value;

    const registroGasto = {
      ingreso,
      cantidad 
    }

    this.saldoService.agregarIngreso( registroGasto ).subscribe( resp => {
      
      Swal.fire('Ingreso registrado', 'El ingreso se ha registrado correctamente', 'success');

      setTimeout(() => {
        this.back();
      }, 2000);

    });
    
  }


  crearCategoria(e){

    e.preventDefault();

    // Selector del texto del input añadirCategoria
    const categoriaInput = (<HTMLInputElement>document.getElementById('nuevaCategoria2')).value;    


    if( categoriaInput === '' ){
      return Swal.fire('ERROR', 'No puede añadir una categoría sin nombre', 'error');
    }

    //Crear etiqueta option con contenga la categoria escrita
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = categoriaInput;
    nuevaOpcion.innerHTML = categoriaInput;


    const categories = (<HTMLInputElement>document.getElementById('categories2'));
    const position = categories.children.length;
    categories[position] = nuevaOpcion; 

    this.inputsIngresos.value.gasto = categoriaInput;
    categories.value = categoriaInput;
    
    
    this.mostrar = true;

  }

  back(){
    this.location.back()
  }

}
