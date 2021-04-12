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
  public categoria : string;
  public invalidCat: boolean = false;

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

    const registroIngreso = {
      ingreso,
      cantidad 
    }

    console.log( registroIngreso );
    

    this.saldoService.agregarIngreso( registroIngreso ).subscribe( resp => {
      
      Swal.fire('Ingreso registrado', 'El ingreso se ha registrado correctamente', 'success');

      setTimeout(() => {
        this.back();
      }, 1000);

    });
    
  }


  back(){
    this.location.back()
  }

  selectCategoria( e: Event, categoria: string ){

    e.preventDefault();
    this.categoria = categoria;

  }


  open( e: Event ){
    e.preventDefault();
  }

  crearCategoria( nombreCategoria: string ){

    if( nombreCategoria === '' ){
      this.invalidCat = true;
      return;
    }

    console.log( nombreCategoria );
    const categorias = document.querySelector('#buttonsIn');

    const newCategoria = document.createElement('button');
    newCategoria.textContent = nombreCategoria;
    newCategoria.classList.add('newCatbuttonIn')
    newCategoria.onclick = (e) => {
      this.selectCategoria( e , nombreCategoria)
    }

    categorias.appendChild(newCategoria);
    

    document.getElementById('cerrarModalIn').click();
    console.log(document.getElementById('cerrarModalIn'));

    this.invalidCat = false;
    Swal.fire('Añadido', `Categoría ${ nombreCategoria } añadida`, 'info');

    this.categoria = nombreCategoria;
    
    

  }

}
