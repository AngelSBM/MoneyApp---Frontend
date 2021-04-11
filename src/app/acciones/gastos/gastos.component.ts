import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaldoService } from 'src/app/services/saldo.service';

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
               private saldoService: SaldoService ) { }

  ngOnInit(): void {

    this.inputsGastos = this.fb.group({
      gasto: ['', Validators.required],
      cantidad: ['', Validators.required]
    })

  }

  agregarGasto(){

    console.log(this.inputsGastos.value);
    
    if ( !this.inputsGastos.valid ){
     return this.valid = false;
    }else {
      this.valid = true;
    };
   
    const { gasto, cantidad } = this.inputsGastos.value;

    const registroGasto = {
      gasto,
      cantidad 
    }

    this.saldoService.agregarGasto( registroGasto ).subscribe()

  }



  crearCategoria(e){

    e.preventDefault();

    // Selector del texto del input añadirCategoria
    const categoriaInput = (<HTMLInputElement>document.getElementById('nuevaCategoria')).value;    


    //Crear etiqueta option con contenga la categoria escrita
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = categoriaInput;
    nuevaOpcion.textContent = categoriaInput;


    const categories = (<HTMLInputElement>document.getElementById('categories'));
    const position = categories.children.length;
    categories[position] = nuevaOpcion; 

    this.inputsGastos.value.gasto = categoriaInput;
    categories.value = categoriaInput;
    
    

    this.mostrar = true;
  }

}
