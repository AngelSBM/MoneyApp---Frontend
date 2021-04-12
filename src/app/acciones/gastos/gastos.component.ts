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
  public categoria : string;
  public invalidCat: boolean = false;

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
      }, 1000);

    });

  }


  back(){
    this.location.back();
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
    const categorias = document.querySelector('#buttons');

    const newCategoria = document.createElement('button');
    newCategoria.textContent = nombreCategoria;
    newCategoria.classList.add('newCatbutton')
    newCategoria.onclick = (e) => {
      this.selectCategoria( e , nombreCategoria)
    }

    categorias.appendChild(newCategoria);
    

    document.getElementById('cerrarModal').click();
    console.log(document.getElementById('cerrarModal'));

    this.invalidCat = false;
    Swal.fire('Añadido', `Categoría ${ nombreCategoria } añadida`, 'info');

    this.categoria = nombreCategoria;
    
    

  }

}
